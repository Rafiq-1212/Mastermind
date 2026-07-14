import { NextResponse } from "next/server";
import { regenerateExportFile } from "@/lib/excelExport";

export async function GET(request: Request) {
  const secret = process.env.ADMIN_EXPORT_SECRET;
  const key = new URL(request.url).searchParams.get("key");

  if (!secret || key !== secret) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const buffer = await regenerateExportFile();
    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="bookcall-submissions-${Date.now()}.xlsx"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[admin/export] Failed to generate export file:", error);
    return NextResponse.json({ success: false, message: "Export failed" }, { status: 500 });
  }
}
