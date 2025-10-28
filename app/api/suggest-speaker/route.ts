import { NextRequest, NextResponse } from "next/server";
import { detectBot, BotProtectionData } from "../../../lib/botProtection";

export async function POST(req: NextRequest) {
  try {
    const {
      yourName,
      yourEmail,
      speakerName,
      speakerEmail,
      speakerBio,
      honeypot,
      honeypot2,
      honeypot3,
      timestamp,
      formStartTime,
      userAgent,
      referrer,
      screenResolution,
      timezone,
      language,
      captchaToken,
    } = await req.json();

    // Comprehensive bot detection
    const botData: BotProtectionData = {
      honeypot: honeypot || "",
      honeypot2: honeypot2 || "",
      honeypot3: honeypot3 || "",
      timestamp: timestamp || Date.now(),
      formStartTime: formStartTime || Date.now(),
      userAgent: userAgent || "",
      referrer: referrer || "",
      screenResolution: screenResolution || "",
      timezone: timezone || "",
      language: language || "",
    };

    const botDetection = detectBot(botData);

    if (botDetection.isBot) {
      console.log("Bot detected:", botDetection.reasons);
      return NextResponse.json(
        { error: "Invalid submission" },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token
    if (!captchaToken) {
      console.log("Missing reCAPTCHA token");
      return NextResponse.json(
        { error: "reCAPTCHA verification required" },
        { status: 400 }
      );
    }

    const captchaResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY!,
          response: captchaToken,
        }),
      }
    );

    const captchaResult = await captchaResponse.json();

    if (!captchaResult.success) {
      console.log("reCAPTCHA verification failed:", captchaResult);
      return NextResponse.json(
        { error: "reCAPTCHA verification failed" },
        { status: 400 }
      );
    }

    // Additional email domain validation
    const botEmailDomains = [
      "10minutemail.com",
      "tempmail.org",
      "guerrillamail.com",
      "mailinator.com",
      "throwaway.email",
      "temp-mail.org",
      "sharklasers.com",
      "grr.la",
      "guerrillamailblock.com",
      "pokemail.net",
      "spam4.me",
      "bccto.me",
      "chacuo.net",
      "dispostable.com",
      "mailnesia.com",
      "mailcatch.com",
      "inboxalias.com",
      "mailmetrash.com",
      "trashmail.net",
      "spamgourmet.com",
    ];

    const yourEmailDomain = yourEmail.split("@")[1]?.toLowerCase();
    const speakerEmailDomain = speakerEmail.split("@")[1]?.toLowerCase();

    if (
      botEmailDomains.includes(yourEmailDomain) ||
      botEmailDomains.includes(speakerEmailDomain)
    ) {
      console.log("Bot email domain detected:", {
        yourEmailDomain,
        speakerEmailDomain,
      });
      return NextResponse.json(
        { error: "Invalid email domain" },
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
