import sgMail from "@sendgrid/mail";
import { ADMIN_EMAILS } from "@/types/adminEmails";
import { NextRequest, NextResponse } from "next/server";
import db from "../../../events.json";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { type, ...emailData } = data;

    // Set the SendGrid API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

    if (type === "contact") {
      // Handle contact form email
      const { name, email, phone, message } = emailData;

      // Email to admin
      const adminMsg = {
        to: ADMIN_EMAILS,
        from: "SVN <admin@svn.haus>",
        subject: "New Contact Form Submission",
        text: `
          Name: ${name}
          Email: ${email}
          Phone: ${phone}
          Message: ${message}
        `,
      };

      // Confirmation email to user
      const userMsg = {
        to: email,
        from: "SVN <admin@svn.haus>",
        subject: "Thank you for contacting DeSciNYC",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <p>Dear ${name},</p>
            
            <p>Thank you for reaching out to DeSciNYC. We have received your message and will get back to you as soon as possible.</p>
            
            <p>Best regards,<br>The DeSciNYC Team</p>
          </div>
        `,
      };

      // Send both emails
      await Promise.all([sgMail.send(adminMsg), sgMail.send(userMsg)]);

      return NextResponse.json({ message: "Email sent successfully" });
    } else if (type === "subscribe") {
      // Handle subscription email
      const { email } = emailData;

      // Get next event data
      const nextEventId = db.next_event;
      const nextEvent = db.events.find((event) => event.id === nextEventId);

      // Email to admin
      const adminMsg = {
        to: ADMIN_EMAILS,
        from: "SVN <admin@svn.haus>",
        subject: "New DeSciNYC email list member!",
        text: `A user signed up with the email ${email}! They are now in the luma list.`,
      };

      // Confirmation email to subscriber
      const subscriberMsg = {
        to: email,
        from: "SVN <admin@svn.haus>",
        subject: "Welcome to DeSciNYC!",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <p>Hi there,</p>
            
            <p>Thanks for subscribing to the DeSciNYC email list! We're thrilled to have you as part of our community.</p>
            
            <p>We'll keep you in the loop with upcoming events.</p>
            
            ${
              nextEvent
                ? `
              <p>Join us at our next event, "${nextEvent.title}" - you can RSVP here:</p>
              <div style="margin: 25px 0;">
                <a href="${nextEvent.luma_url}" 
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
      };

      // Send both emails
      await Promise.all([sgMail.send(adminMsg), sgMail.send(subscriberMsg)]);

      return NextResponse.json({ message: "Subscription confirmed" });
    } else {
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
