"use server";

import sgMail from "@sendgrid/mail";
import { supabase } from "./supabaseClient";

const ADMIN_EMAILS = ["kyritzb@gmail.com", "mfischer1000@gmail.com"];

export const handleAddToEmailList = async (email: string): Promise<void> => {
  // Add to Supabase
  const { error } = await supabase
    .from("email_list")
    .insert([{ email: email }]);

  if (error) {
    console.error("Error adding email to list:", error);
    throw new Error("Failed to add email to list");
  }

  // Add to Luma
  const lumaApiKey = process.env.LUMA_API_KEY;
  if (!lumaApiKey) {
    console.error("Luma API key not found");
    throw new Error("Luma API key not configured");
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
        tag_api_ids: [process.env.LUMA_WEBSITE_TAG], //website key
        infos: [{ email }],
      }),
    }
  );

  // Read the response body
  const responseBody = await lumaResponse.text();
  console.log("Luma API Response:", responseBody);

  if (!lumaResponse.ok) {
    console.error("Error adding email to Luma:", responseBody);
    throw new Error("Failed to add email to Luma");
  }

  console.log("Sending the admin emails");
  await handleSendEmailAdmin(
    "New DeSciNYC email list member!",
    `A user signed up with the email ${email}! They are now in the luma list.`
  );

  console.log("Successfully added email to Luma");
};

export async function handleAddContactFormResponse(
  name: string,
  email: string,
  phoneNumber: string,
  message: string
) {
  const { data, error } = await supabase
    .from("desci_nyc_contact_us_form")
    .insert([
      {
        name,
        email,
        phone_number: phoneNumber,
        message,
      },
    ])
    .select();

  if (error) {
    console.error("Error adding contact form response:", error);
    return { success: false, error: "Failed to submit contact form" };
  }

  return { success: true, data };
}

export const handleSendEmailAdmin = async (
  subject: string,
  text: string
): Promise<void> => {
  "use server";

  // Set the SendGrid API key
  //@ts-ignore

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  console.log("Sending email!");

  const msg = {
    to: ADMIN_EMAILS,
    from: "SVN <admin@svn.haus>", // Updated sender name
    subject: subject,
    text: text,
  };

  try {
    let a = await sgMail.send(msg);
    console.log("Sent email!");
  } catch (error) {
    console.error(error);
  }
};

