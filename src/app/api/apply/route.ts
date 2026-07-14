import { NextResponse } from "next/server";
import { saveApplication } from "../../../service/apply_service";
import { appendRecordToExportFile } from "@/lib/excelExport";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      !body.name ||
      !body.email ||
      !body.company ||
      !body.revenue
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    const created = await saveApplication(body);

    // Additive export step: never lets an export failure fail the
    // submission itself (appendRecordToExportFile swallows its own errors).
    await appendRecordToExportFile(created);

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}