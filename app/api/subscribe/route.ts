import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Add email to Supabase
    const { error: supabaseError } = await supabase
      .from("email_list")
      .insert([{ email: email }]);

    if (supabaseError) {
      console.error("Error adding email to list:", supabaseError);
      return NextResponse.json(
        { error: "Failed to add email to list" },
        { status: 400 }
      );
    }

    // Add to Luma
    const lumaApiKey = process.env.LUMA_API_KEY;
    if (!lumaApiKey) {
      console.error("Luma API key not found");
      return NextResponse.json(
        { error: "Configuration error" },
        { status: 500 }
      );
    }

    const lumaResponse = await fetch(
      "https://api.lu.ma/public/v1/calendar/import-people",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Luma-Api-Key": lumaApiKey,
        },
        body: JSON.stringify({
          tag_api_ids: [process.env.LUMA_WEBSITE_TAG],
          infos: [{ email }],
        }),
      }
    );

    if (!lumaResponse.ok) {
      const responseBody = await lumaResponse.text();
      console.error("Error adding email to Luma:", responseBody);
      return NextResponse.json(
        { error: "Failed to add to Luma" },
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
          type: "subscribe",
          email: email,
        }),
      }
    );

    console.log("Email response:", emailResponse);

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
