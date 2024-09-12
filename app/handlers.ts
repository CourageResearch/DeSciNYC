"use server";

import { supabase } from "./supabaseClient";

export const handleAddToEmailList = async (email: string): Promise<void> => {
  const { error } = await supabase
    .from("email_list")
    .insert([{ email: email }]);

  if (error) {
    console.error("Error adding email to list:", error);
    throw new Error("Failed to add email to list");
  }
};

export async function handleAddContactFormResponse(
  name: string,
  email: string,
  phoneNumber: string,
  message: string
) {
  console.log(name, email, phoneNumber, message);
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
