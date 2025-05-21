import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// Function to fetch Luma event data
async function getLumaEvent(lumaId: string) {
  if (!process.env.LUMA_API_KEY) {
    console.error("LUMA_API_KEY is not defined");
    return null;
  }

  const config = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-luma-api-key": process.env.LUMA_API_KEY,
    },
  };

  try {
    const response = await fetch(
      `https://api.lu.ma/public/v1/event/get?api_id=${lumaId}`,
      config
    );
    
    if (!response.ok) {
      console.error(`Failed to fetch Luma event ${lumaId}:`, response.status, response.statusText);
      return null;
    }
    
    return response.json();
  } catch (error) {
    console.error(`Failed to fetch Luma event ${lumaId}:`, error);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Add email to Supabase
    // const { error: supabaseError } = await supabase
    //   .from("email_list")
    //   .insert([{ email: email }]);

    // if (supabaseError) {
    //   console.error("Error adding email to list:", supabaseError);
    //   return NextResponse.json(
    //     { error: "Failed to add email to list" },
    //     { status: 400 }
    //   );
    // }

    // Add to Luma
    const lumaApiKey = process.env.LUMA_API_KEY;
    const lumaWebsiteTag = process.env.LUMA_WEBSITE_TAG;
    
    if (!lumaApiKey) {
      console.error("Luma API key not found");
      return NextResponse.json(
        { error: "Configuration error" },
        { status: 500 }
      );
    }

    // Only try to add to Luma if we have both the API key and website tag
    if (lumaWebsiteTag) {
      const lumaResponse = await fetch(
        "https://api.lu.ma/public/v1/calendar/import-people",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Luma-Api-Key": lumaApiKey,
          },
          body: JSON.stringify({
            tag_api_ids: [lumaWebsiteTag],
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
    } else {
      console.warn("LUMA_WEBSITE_TAG not set - skipping Luma subscription");
    }

    // Get next event from Supabase
    const { data: upcomingEvents, error: supabaseError } = await supabase
      .from('events')
      .select('*')
      .eq('active', true)
      .order('id', { ascending: true });

    if (supabaseError) {
      console.error('Error fetching events:', supabaseError);
      return NextResponse.json(
        { error: "Failed to fetch events" },
        { status: 500 }
      );
    }

    let nextEvent = null;
    if (upcomingEvents && upcomingEvents.length > 0) {
      // Get the first upcoming event
      const nextUpcomingEvent = upcomingEvents[0];
      console.log('Next upcoming event from Supabase:', nextUpcomingEvent);

      // Fetch Luma event details
      const lumaData = await getLumaEvent(nextUpcomingEvent.luma_id);
      console.log('Luma event data:', lumaData);

      if (lumaData?.event) {
        nextEvent = {
          name: lumaData.event.name,
          url: nextUpcomingEvent.luma_url,
          start_at: lumaData.event.start_at,
          cover_url: lumaData.event.cover_url
        };
        console.log('Processed next event:', nextEvent);
      }
    }

    // Send notification email
    const origin = req.headers.get('origin') || 'http://localhost:3000';
    const emailResponse = await fetch(
      `${origin}/api/send-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "subscribe",
          email: email,
          nextEvent: nextEvent
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
