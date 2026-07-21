import type { ClientIntake } from "@/generated/prisma/client";

export interface ClientIntakeExportColumn {
  header: string;
  key: string;
  width: number;
  value: (record: ClientIntake) => string | number;
}

/**
 * Single source of truth for the exported Excel/Sheets columns for the
 * client-intake questionnaire — mirrors lib/exportColumns.ts but for the
 * ClientIntake model. Add a field to the Prisma schema, save it in
 * client_intake_service.ts, then add one entry here.
 */
export const CLIENT_INTAKE_EXPORT_COLUMNS: ClientIntakeExportColumn[] = [
  { header: "Name", key: "name", width: 24, value: (r) => r.name },
  { header: "Email", key: "email", width: 30, value: (r) => r.email },
  { header: "Date of Birth", key: "dob", width: 16, value: (r) => r.dob ?? "" },
  { header: "Phone Number", key: "phone", width: 18, value: (r) => r.phone },
  { header: "Business Type", key: "businessType", width: 40, value: (r) => r.businessType },
  { header: "Years In Industry", key: "industryDuration", width: 18, value: (r) => r.industryDuration },
  { header: "Current Income Level", key: "incomeLevel", width: 26, value: (r) => r.incomeLevel },
  { header: "Annual Income Target", key: "incomeTarget", width: 22, value: (r) => r.incomeTarget },
  { header: "Meeting Monthly Targets", key: "meetingTargets", width: 20, value: (r) => r.meetingTargets },
  { header: "Website Details", key: "websiteDetails", width: 30, value: (r) => r.websiteDetails },
  { header: "Social Media Links", key: "socialLinks", width: 30, value: (r) => r.socialLinks },
  { header: "Investment Ready (1L-1.5L/mo)", key: "investmentReady", width: 24, value: (r) => r.investmentReady },
  { header: "How They Found Us", key: "foundUs", width: 30, value: (r) => r.foundUs.join(", ") },
  {
    header: "Submitted Date & Time",
    key: "createdAt",
    width: 22,
    value: (r) => r.createdAt.toISOString().replace("T", " ").slice(0, 19),
  },
];

// Kept out of the visible columns but written to a trailing column so
// repeated real-time appends (Excel + Sheets) can detect duplicates.
export const CLIENT_INTAKE_ID_COLUMN: ClientIntakeExportColumn = {
  header: "Submission ID",
  key: "id",
  width: 14,
  value: (r) => r.id,
};
