import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      yourName,
      yourEmail,
      speakerName,
      speakerEmail,
      speakerBio,
      honeypot,
    } = await req.json();

    // Check honeypot field - if it has any value, it's likely a bot
    if (honeypot && honeypot.trim() !== "") {
      console.log("Bot detected via honeypot field");
      return NextResponse.json(
        { error: "Invalid submission" },
        { status: 400 }
      );
    }

    // Send notification email
    const emailResponse = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/send-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "suggest",
          yourName: yourName,
          yourEmail: yourEmail,
          speakerName: speakerName,
          speakerEmail: speakerEmail,
          speakerBio: speakerBio,
        }),
      }
    );

    if (!emailResponse.ok) {
      console.error("Failed to send notification email");
    }

    return NextResponse.json({ message: "Subscription successful" });
  } catch (error) {
    console.error("Error in subscription process:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
