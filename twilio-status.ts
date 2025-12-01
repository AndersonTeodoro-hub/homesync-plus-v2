import { NextResponse } from "next/server";
import twilio from "twilio";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sid = searchParams.get("sid");

    if (!sid) {
      return NextResponse.json(
        { error: "Missing call SID." },
        { status: 400 }
      );
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID!;
    const authToken = process.env.TWILIO_AUTH_TOKEN!;

    const client = twilio(accountSid, authToken);

    const callData = await client.calls(sid).fetch();

    return NextResponse.json({
      status: callData.status,
    });

  } catch (error: any) {
    console.error("Twilio Status Error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
