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
