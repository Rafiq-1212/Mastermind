import { NextResponse } from "next/server";
import { saveApplication } from "../../../service/apply_service";

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

    await saveApplication(body);

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