import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { ADMIN_EMAILS } from "@/types/adminEmails";

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
      msg = {
        to: ADMIN_EMAILS,
        from: "SVN <admin@svn.haus>",
        subject: "New DeSciNYC email list member!",
        text: `A user signed up with the email ${email}! They are now in the luma list.`,
      };
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
