import fs from "fs/promises";
import path from "path";
import ExcelJS from "exceljs";
import { prisma } from "@/lib/prisma";
import { EXPORT_COLUMNS, ID_COLUMN } from "@/lib/exportColumns";
import type { Application } from "@/generated/prisma/client";

const EXPORT_DIR = path.join(process.cwd(), "exports");
const EXPORT_FILE = path.join(EXPORT_DIR, "bookcall-submissions.xlsx");
const SHEET_NAME = "Submissions";

const ALL_COLUMNS = [...EXPORT_COLUMNS, ID_COLUMN];

function newWorkbook(): ExcelJS.Workbook {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(SHEET_NAME, {
    views: [{ state: "frozen", ySplit: 1 }],
  });
  sheet.columns = ALL_COLUMNS.map((col) => ({ header: col.header, key: col.key, width: col.width }));
  sheet.getRow(1).font = { bold: true };
  return workbook;
}

function addRow(workbook: ExcelJS.Workbook, record: Application) {
  const sheet = workbook.getWorksheet(SHEET_NAME);
  if (!sheet) return;
  const row: Record<string, string | number> = {};
  for (const col of ALL_COLUMNS) row[col.key] = col.value(record);
  sheet.addRow(row);
}

async function ensureExportDir() {
  await fs.mkdir(EXPORT_DIR, { recursive: true });
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Persists the buffer to EXPORT_FILE via a temp-file-then-rename swap (so a
 * crash mid-write never leaves a half-written file). On Windows this rename
 * fails while the file is open in another program (e.g. someone has it open
 * in Excel) — that's a real OS-level lock, not something we can force past.
 * Retries a few times in case it's a brief lock (antivirus scan, search
 * indexer), then gives up on the disk copy without throwing: the caller
 * already has the correct buffer in hand regardless of whether the on-disk
 * convenience copy could be updated.
 */
async function persistToDisk(buffer: Buffer): Promise<void> {
  await ensureExportDir();
  const tempFile = `${EXPORT_FILE}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tempFile, buffer);

  const attempts = 3;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      await fs.rename(tempFile, EXPORT_FILE);
      return;
    } catch (error) {
      if (attempt === attempts) {
        console.warn(
          `[excelExport] Could not update ${EXPORT_FILE} — it's likely open in another ` +
            "program (e.g. Excel). Close the file to resume auto-sync, or fetch " +
            "/api/admin/export?key=... which always returns the correct data regardless.",
          error
        );
        await fs.rm(tempFile, { force: true });
        return;
      }
      await sleep(200 * attempt);
    }
  }
}

async function writeWorkbook(workbook: ExcelJS.Workbook): Promise<Buffer> {
  const buffer = Buffer.from(await workbook.xlsx.writeBuffer());
  await persistToDisk(buffer);
  return buffer;
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function regenerateExportFileInner(): Promise<Buffer> {
  const records = await prisma.application.findMany({ orderBy: { createdAt: "asc" } });
  const workbook = newWorkbook();
  for (const record of records) addRow(workbook, record);
  return writeWorkbook(workbook);
}

async function appendRecordToExportFileInner(record: Application): Promise<void> {
  if (!(await fileExists(EXPORT_FILE))) {
    // First submission since this feature shipped — seed the file with
    // every historical record (including this one) in one shot.
    await regenerateExportFileInner();
    return;
  }

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(EXPORT_FILE);
  const sheet = workbook.getWorksheet(SHEET_NAME);

  if (!sheet) {
    await regenerateExportFileInner();
    return;
  }

  // ExcelJS doesn't persist column `key`s in the .xlsx file itself, so a
  // freshly-loaded worksheet has no key -> column mapping. Without this,
  // addRow()'s keyed object below silently produces an empty row.
  sheet.columns = ALL_COLUMNS.map((col) => ({ header: col.header, key: col.key, width: col.width }));

  const headerRowValues = sheet.getRow(1).values as unknown as string[];
  const idColNumber = Array.isArray(headerRowValues) ? headerRowValues.indexOf(ID_COLUMN.header) : -1;

  if (idColNumber > 0) {
    let alreadyExported = false;
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      if (Number(row.getCell(idColNumber).value) === record.id) alreadyExported = true;
    });
    if (alreadyExported) return;
  }

  addRow(workbook, record);
  await writeWorkbook(workbook);
}

// A single .xlsx file can't be safely read-modified-written by two
// overlapping calls at once (the second write would clobber the first, or
// corrupt the file mid-write). This chains every read-modify-write onto a
// single in-process queue so submissions arriving milliseconds apart are
// still applied one at a time, in order.
let writeQueue: Promise<unknown> = Promise.resolve();
function withWriteLock<T>(task: () => Promise<T>): Promise<T> {
  const result = writeQueue.then(task, task);
  writeQueue = result.then(
    () => undefined,
    () => undefined
  );
  return result;
}

/**
 * Rebuilds the export file from scratch using every record currently in the
 * database. Source of truth is always the DB, so this can never drift or
 * duplicate — used for the on-demand admin download, and to bootstrap the
 * file the first time a real-time append happens.
 */
export function regenerateExportFile(): Promise<Buffer> {
  return withWriteLock(regenerateExportFileInner);
}

/**
 * Appends a single new submission to the live export file. Safe to call
 * right after a successful DB insert — never throws (errors are logged and
 * swallowed) so a failure here can never break the form submission flow.
 */
export async function appendRecordToExportFile(record: Application): Promise<void> {
  try {
    await withWriteLock(() => appendRecordToExportFileInner(record));
  } catch (error) {
    console.error("[excelExport] Failed to append submission to export file:", error);
  }
}

export function getExportFilePath(): string {
  return EXPORT_FILE;
}
