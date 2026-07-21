import { google } from "googleapis";
import { CLIENT_INTAKE_EXPORT_COLUMNS, CLIENT_INTAKE_ID_COLUMN } from "@/lib/clientIntakeExportColumns";
import type { ClientIntake } from "@/generated/prisma/client";

const ROW_COLUMNS = [...CLIENT_INTAKE_EXPORT_COLUMNS, CLIENT_INTAKE_ID_COLUMN];
const SHEET_TAB = process.env.GOOGLE_SHEET_TAB_NAME || "Submissions";

let sheetsClient: ReturnType<typeof google.sheets> | null = null;
let headerEnsured = false;

/**
 * Reads credentials lazily (not at module load) so a missing/incomplete
 * .env never crashes the app at import time — every caller in this file
 * treats "not configured" as a normal, silent no-op.
 */
function getCredentials() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!email || !privateKey || !sheetId) return null;

  return {
    email,
    // .env stores literal "\n" sequences for a multi-line PEM key; restore real newlines.
    privateKey: privateKey.replace(/\\n/g, "\n"),
    sheetId,
  };
}

function getSheetsClient() {
  if (sheetsClient) return sheetsClient;

  const creds = getCredentials();
  if (!creds) return null;

  const auth = new google.auth.JWT({
    email: creds.email,
    key: creds.privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  sheetsClient = google.sheets({ version: "v4", auth });
  return sheetsClient;
}

async function ensureHeaderRow(sheets: ReturnType<typeof google.sheets>, sheetId: string) {
  if (headerEnsured) return;

  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${SHEET_TAB}!A1:1`,
  });

  if (!existing.data.values || existing.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `${SHEET_TAB}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [ROW_COLUMNS.map((col) => col.header)] },
    });
  }

  headerEnsured = true;
}

/**
 * Appends one submission as a new row in the configured Google Sheet.
 * No-ops (with a one-time console warning) when GOOGLE_SERVICE_ACCOUNT_EMAIL,
 * GOOGLE_PRIVATE_KEY, or GOOGLE_SHEET_ID aren't set — and never throws, so a
 * Sheets outage or misconfiguration can never break the form submission
 * itself (the DB write already succeeded by the time this runs).
 */
export async function appendClientIntakeToGoogleSheet(record: ClientIntake): Promise<void> {
  const creds = getCredentials();
  if (!creds) {
    console.warn(
      "[googleSheets] Skipping sync — set GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, " +
        "and GOOGLE_SHEET_ID in .env to enable it."
    );
    return;
  }

  try {
    const sheets = getSheetsClient();
    if (!sheets) return;

    await ensureHeaderRow(sheets, creds.sheetId);

    await sheets.spreadsheets.values.append({
      spreadsheetId: creds.sheetId,
      range: `${SHEET_TAB}!A1`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [ROW_COLUMNS.map((col) => col.value(record))],
      },
    });
  } catch (error) {
    console.error("[googleSheets] Failed to append submission to Google Sheet:", error);
  }
}
