import { Resend } from "resend";
import { ADMIN_EMAILS } from "@/types/adminEmails";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { type, ...emailData } = data;

    switch (type) {
      case "contact": {
        const { name, email, phone, message } = emailData;

        await Promise.all([
          // Admin notification
          resend.emails.send({
            from: "DeSciNYC <admin@desci.nyc>",
            to: ADMIN_EMAILS,
            subject: "New Contact Form Submission",
            text: `
              Name: ${name}
              Email: ${email}
              Phone: ${phone}
              Message: ${message}
            `,
          }),
          // User confirmation
          resend.emails.send({
            from: "DeSciNYC <admin@desci.nyc>",
            to: [email],
            subject: "Thank you for contacting DeSciNYC",
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <p>Dear ${name},</p>
                
                <p>Thank you for reaching out to DeSciNYC. We have received your message and will get back to you as soon as possible.</p>
                
                <p>Best regards,<br>The DeSciNYC Team</p>
              </div>
            `,
          }),
        ]);

        return NextResponse.json({ message: "Email sent successfully" });
      }

      case "subscribe": {
        const { email, nextEvent } = emailData;

        await Promise.all([
          // Admin notification
          resend.emails.send({
            from: "DeSciNYC <admin@desci.nyc>",
            to: ADMIN_EMAILS,
            subject: "New DeSciNYC email list member!",
            text: `A user signed up with the email ${email}! They are now in the luma list.`,
          }),
          // Subscriber confirmation
          resend.emails.send({
            from: "DeSciNYC <admin@desci.nyc>",
            to: [email],
            subject: "Welcome to DeSciNYC!",
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;">
                <p>Hi there,</p>

                <p>Thanks for subscribing to the DeSciNYC email list! We're thrilled to have you as part of our community.</p>

                <p>We'll keep you in the loop with upcoming events.</p>

                ${
                  nextEvent
                    ? `
                <p>Join us at our next event, "${nextEvent.name}" - you can RSVP here:</p>
                <div style="margin: 25px 0;">
                  <a href="${nextEvent.url}" 
                     style="background-color: #0FA711; 
                            color: white; 
                            padding: 10px 20px; 
                            text-decoration: none; 
                            border-radius: 0px; 
                            display: inline-block;">
                    RSVP to Event
                  </a>
                </div>
                `
                    : ""
                }

                <p>Missed an event or want to catch up? You can watch previous event recordings anytime on our website here:</p>
                <div style="margin: 25px 0;">
                  <a href="https://www.desci.nyc/#past-events" 
                     style="background-color: #0FA711; 
                            color: white; 
                            padding: 10px 20px; 
                            text-decoration: none; 
                            border-radius: 0px; 
                            display: inline-block;">
                    Watch Recordings
                  </a>
                </div>

                <p>Looking forward to seeing you soon!</p>

                <p>All the best,<br>The DeSciNYC Team</p>
              </div>
            `,
          }),
        ]);

        return NextResponse.json({ message: "Subscription confirmed" });
      }

      case "suggest": {
        const { yourName, yourEmail, speakerName, speakerEmail, speakerBio } =
          emailData;

        await Promise.all([
          // Admin notification
          resend.emails.send({
            from: "DeSciNYC <admin@desci.nyc>",
            to: ADMIN_EMAILS,
            subject: "New Speaker Suggestion",
            text: `
              Suggested by:
              Name: ${yourName}
              Email: ${yourEmail}

              Speaker Details:
              Name: ${speakerName}
              Email: ${speakerEmail}
              Bio: ${speakerBio}
            `,
          }),
          // User confirmation
          resend.emails.send({
            from: "DeSciNYC <admin@desci.nyc>",
            to: [yourEmail],
            subject: "Thank you for your speaker suggestion",
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <p>Dear ${yourName},</p>
                
                <p>Thank you for suggesting a speaker for DeSciNYC. We appreciate your contribution to our community.</p>
                              
                <p>Best regards,<br>The DeSciNYC Team</p>
              </div>
            `,
          }),
        ]);

        return NextResponse.json({ message: "Speaker suggestion received" });
      }

      default:
        return NextResponse.json(
          { error: "Invalid email type" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
