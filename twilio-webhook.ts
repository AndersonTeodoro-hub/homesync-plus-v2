import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req: Request) {
  try {
    const { to, message } = await req.json();

    const accountSid = process.env.TWILIO_ACCOUNT_SID!;
    const authToken = process.env.TWILIO_AUTH_TOKEN!;
    const fromNumber = process.env.TWILIO_PHONE_NUMBER!;

    if (!accountSid || !authToken || !fromNumber) {
      return NextResponse.json(
        { error: "Twilio environment variables missing." },
        { status: 500 }
      );
    }

    const client = twilio(accountSid, authToken);

    const call = await client.calls.create({
      to,
      from: fromNumber,
      twiml: `<Response><Say>${message}</Say></Response>`,
    });

    return NextResponse.json({
      mode: "real",
      sid: call.sid,
    });

  } catch (error: any) {
    console.error("Twilio Error:", error);
    return NextResponse.json(
      { error: error.message, mode: "beta" },
      { status: 500 }
    );
  }
}
