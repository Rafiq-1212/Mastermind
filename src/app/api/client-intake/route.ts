import { NextResponse } from "next/server";
import { saveClientIntake } from "../../../service/client_intake_service";
import { appendClientIntakeToExportFile } from "@/lib/clientIntakeExcelExport";
import { appendClientIntakeToGoogleSheet } from "@/lib/googleSheets";

const REQUIRED_FIELDS = [
  "name",
  "email",
  "dob",
  "phone",
  "businessType",
  "industryDuration",
  "incomeLevel",
  "incomeTarget",
  "meetingTargets",
  "websiteDetails",
  "socialLinks",
  "investmentReady",
] as const;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const missingField = REQUIRED_FIELDS.some((field) => !body[field]);
    const missingChoices =
      !Array.isArray(body.servicesLooking) ||
      body.servicesLooking.length === 0 ||
      !Array.isArray(body.foundUs) ||
      body.foundUs.length === 0;

    if (missingField || missingChoices) {
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

    const created = await saveClientIntake(body);

    // Additive sync steps: neither can fail the submission itself — both
    // swallow their own errors internally.
    await appendClientIntakeToExportFile(created);
    await appendClientIntakeToGoogleSheet(created);

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
