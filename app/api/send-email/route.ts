import sgMail from "@sendgrid/mail";
import { ADMIN_EMAILS } from "@/types/adminEmails";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { type, ...emailData } = data;

    // Set the SendGrid API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

    let msg;

    if (type === "contact") {
      // Handle contact form email
      const { name, email, phone, message } = emailData;
      msg = {
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
    } else if (type === "subscribe") {
      // Handle subscription email
      const { email } = emailData;

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
        text: `Thank you for subscribing to DeSciNYC's email list! We're excited to have you join our community.

We'll keep you updated with the latest news, events, and opportunities in the DeSciNYC ecosystem.

Best regards,
The DeSciNYC Team`,
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

    await sgMail.send(msg);
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
