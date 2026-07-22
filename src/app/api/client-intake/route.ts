import { NextResponse } from "next/server";
import { saveClientIntake } from "../../../service/client_intake_service";

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
    const missingChoices = !Array.isArray(body.foundUs) || body.foundUs.length === 0;
    const missingOtherDetail = Array.isArray(body.foundUs) && body.foundUs.includes("Others") && !body.foundUsOther;

    if (missingField || missingChoices || missingOtherDetail) {
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

    await saveClientIntake(body);

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
