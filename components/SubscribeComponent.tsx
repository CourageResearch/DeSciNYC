import { Input } from "./ui/input";
import sgMail from "@sendgrid/mail";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabaseClient";
import HorizontalLines from "./ui/HorizontalLines";
import { ADMIN_EMAILS } from "@/types/adminEmails";
import { revalidatePath } from "next/cache";

export const handleSendEmailAdmin = async (
  subject: string,
  text: string
): Promise<void> => {
  "use server";

  // Set the SendGrid API key
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  console.log("Sending email!");

  const msg = {
    to: ADMIN_EMAILS,
    from: "SVN <admin@svn.haus>", // Updated sender name
    subject: subject,
    text: text,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent!");
  } catch (error) {
    console.error(error);
  }
};

async function handleSubmit(formData: FormData) {
  "use server";
  const email = formData.get("email");

  try {
    const { error } = await supabase
      .from("email_list")
      .insert([{ email: email }]);

    if (error) {
      console.error("Error adding email to list:", error);
      return;
    }

    const lumaApiKey = process.env.LUMA_API_KEY;
    if (!lumaApiKey) {
      console.error("Luma API key not found");
      return;
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

    console.log("LUMA RESPONSE", lumaResponse);

    const responseBody = await lumaResponse.text();
    console.log("Luma API Response:", responseBody);

    if (!lumaResponse.ok) {
      console.error("Error adding email to Luma:", responseBody);
      return;
    }

    console.log("Sending the admin emails");
    await handleSendEmailAdmin(
      "New DeSciNYC email list member!",
      `A user signed up with the email ${email}! They are now in the luma list.`
    );

    revalidatePath("/");
  } catch (error) {
    console.error("Error subscribing to mailing list:", error);
  }
}

const SubscribeComponent = () => {
  return (
    <div
      className="relative w-full bg-gradient-to-b from-[#0d230d] to-black"
      id="subscribe"
    >
      <HorizontalLines />
      <div className="max-w-[1100px] mx-auto flex flex-col items-center justify-center">
        <div className="flex flex-col gap-4 my-20 md:my-40 bg-gradient-to-b from-transparent via-[#0fa711] to-transparent px-8 py-12">
          <h3 className="text-stone-200 uppercase text-5xl font-medium font-Jersey15">
            Subscribe to mailing list
          </h3>
          <p className="w-full md:w-2/3 text-stone-200 font-semibold">
            About once a month, we sent out an email with the latest news,
            events, and updates from the decentralized science community in NYC
          </p>
          <form
            action={handleSubmit}
            className="flex flex-col gap-4 w-full md:w-2/3 mt-12"
          >
            <div className="flex items-center">
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="rounded-none bg-[#0d230d] border-[#0fa711]/40 text-stone-200 placeholder:text-[#0fa711]/40 h-10"
                required
              />
              <Button
                variant="green"
                className="w-40 font-bold text-white h-10"
                type="submit"
              >
                Subscribe
              </Button>
            </div>
            <div id="message-container" className="text-center">
              {/* Server messages will be shown here */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubscribeComponent;
