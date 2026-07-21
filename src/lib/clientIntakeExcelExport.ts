import fs from "fs/promises";
import path from "path";
import ExcelJS from "exceljs";
import { prisma } from "@/lib/prisma";
import { CLIENT_INTAKE_EXPORT_COLUMNS, CLIENT_INTAKE_ID_COLUMN } from "@/lib/clientIntakeExportColumns";
import type { ClientIntake } from "@/generated/prisma/client";

const EXPORT_DIR = path.join(process.cwd(), "exports");
const EXPORT_FILE = path.join(EXPORT_DIR, "client-intake-submissions.xlsx");
const SHEET_NAME = "Submissions";

const ALL_COLUMNS = [...CLIENT_INTAKE_EXPORT_COLUMNS, CLIENT_INTAKE_ID_COLUMN];

function newWorkbook(): ExcelJS.Workbook {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(SHEET_NAME, {
    views: [{ state: "frozen", ySplit: 1 }],
  });
  sheet.columns = ALL_COLUMNS.map((col) => ({ header: col.header, key: col.key, width: col.width }));
  sheet.getRow(1).font = { bold: true };
  return workbook;
}

function addRow(workbook: ExcelJS.Workbook, record: ClientIntake) {
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
          `[clientIntakeExcelExport] Could not update ${EXPORT_FILE} — it's likely open in another ` +
            "program (e.g. Excel). Close the file to resume auto-sync.",
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
  const records = await prisma.clientIntake.findMany({ orderBy: { createdAt: "asc" } });
  const workbook = newWorkbook();
  for (const record of records) addRow(workbook, record);
  return writeWorkbook(workbook);
}

async function appendRecordToExportFileInner(record: ClientIntake): Promise<void> {
  if (!(await fileExists(EXPORT_FILE))) {
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
  const idColNumber = Array.isArray(headerRowValues) ? headerRowValues.indexOf(CLIENT_INTAKE_ID_COLUMN.header) : -1;

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

let writeQueue: Promise<unknown> = Promise.resolve();
function withWriteLock<T>(task: () => Promise<T>): Promise<T> {
  const result = writeQueue.then(task, task);
  writeQueue = result.then(
    () => undefined,
    () => undefined
  );
  return result;
}

export function regenerateClientIntakeExportFile(): Promise<Buffer> {
  return withWriteLock(regenerateExportFileInner);
}

/**
 * Appends a single new submission to the live export file. Safe to call
 * right after a successful DB insert — never throws (errors are logged and
 * swallowed) so a failure here can never break the form submission flow.
 */
export async function appendClientIntakeToExportFile(record: ClientIntake): Promise<void> {
  try {
    await withWriteLock(() => appendRecordToExportFileInner(record));
  } catch (error) {
    console.error("[clientIntakeExcelExport] Failed to append submission to export file:", error);
  }
}

export function getClientIntakeExportFilePath(): string {
  return EXPORT_FILE;
}
