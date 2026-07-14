import type { Application } from "@/generated/prisma/client";

export interface ExportColumn {
  header: string;
  key: string;
  width: number;
  value: (record: Application) => string | number;
}

/**
 * Single source of truth for the exported Excel columns.
 * To add a new field later (e.g. phone): add it to the Prisma schema,
 * save it in apply_service.ts as usual, then add one entry here —
 * both the real-time append and the on-demand /api/admin/export
 * regenerate pick it up automatically.
 */
export const EXPORT_COLUMNS: ExportColumn[] = [
  { header: "Name", key: "name", width: 24, value: (r) => r.name },
  { header: "Email", key: "email", width: 30, value: (r) => r.email },
  { header: "Company", key: "company", width: 24, value: (r) => r.company },
  { header: "Role", key: "role", width: 20, value: (r) => r.role },
  { header: "Business Revenue Range", key: "revenue", width: 22, value: (r) => r.revenue },
  { header: "Biggest Bottleneck", key: "bottleneck", width: 40, value: (r) => r.bottleneck ?? "" },
  {
    header: "Submitted Date & Time",
    key: "createdAt",
    width: 22,
    value: (r) => r.createdAt.toISOString().replace("T", " ").slice(0, 19),
  },
];

// Kept out of EXPORT_COLUMNS (not a visible business field) but written to a
// trailing column so repeated real-time appends can detect duplicates.
export const ID_COLUMN: ExportColumn = {
  header: "Submission ID",
  key: "id",
  width: 14,
  value: (r) => r.id,
};
