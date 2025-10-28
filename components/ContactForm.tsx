"use client";

import { z } from "zod";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { CheckIcon, Loader2, XIcon } from "lucide-react";
import { generateBotProtectionData } from "../lib/botProtection";
import {
  useGoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react19-google-recaptcha-v3";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  honeypot: z.string().optional(), // Honeypot field to catch bots
  honeypot2: z.string().optional(), // Additional honeypot
  honeypot3: z.string().optional(), // Third honeypot
  timestamp: z.number(),
  formStartTime: z.number(),
  userAgent: z.string(),
  referrer: z.string(),
  screenResolution: z.string(),
  timezone: z.string(),
  language: z.string(),
  captchaToken: z.string().optional(), // reCAPTCHA token
});

const ContactForm = () => {
  const [formStartTime] = useState(Date.now());
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      honeypot: "",
      honeypot2: "",
      honeypot3: "",
      timestamp: 0,
      formStartTime: formStartTime,
      userAgent: "",
      referrer: "",
      screenResolution: "",
      timezone: "",
      language: "",
      captchaToken: "",
    },
  });

  // Initialize bot protection data when component mounts
  useEffect(() => {
    const botData = generateBotProtectionData();
    form.setValue("formStartTime", botData.formStartTime || Date.now());
    form.setValue("userAgent", botData.userAgent || "");
    form.setValue("referrer", botData.referrer || "");
    form.setValue("screenResolution", botData.screenResolution || "");
    form.setValue("timezone", botData.timezone || "");
    form.setValue("language", botData.language || "");
  }, [form]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      // Execute reCAPTCHA
      if (!executeRecaptcha) {
        setMessage({
          text: "reCAPTCHA not available. Please refresh the page and try again.",
          type: "error",
        });
        return;
      }

      const captchaToken = await executeRecaptcha("contact_form");
      if (!captchaToken) {
        setMessage({
          text: "reCAPTCHA verification failed. Please try again.",
          type: "error",
        });
        return;
      }

      // Update timestamp and captcha token before sending
      values.timestamp = Date.now();
      values.captchaToken = captchaToken;

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "contact",
          ...values,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setMessage({ text: data.error, type: "error" });
        console.error("Contact form failed:", data.error);
        return;
      }

      setMessage({
        text: "Message sent successfully!",
        type: "success",
      });
      form.reset();
    } catch (error) {
      console.error("Error sending message:", error);
      setMessage({
        text: "An error occurred while submitting your message",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="Name"
                    className="rounded-none bg-[#0D230D] placeholder:text-[#0FA711]/40 border-[#0FA711]/40"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="Email"
                    className="rounded-none bg-[#0D230D] placeholder:text-[#0FA711]/40 border-[#0FA711]/40"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="Phone Number"
                    className="rounded-none bg-[#0D230D] placeholder:text-[#0FA711]/40 border-[#0FA711]/40"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={isLoading}
                    placeholder="Message"
                    className="rounded-none bg-[#0D230D] placeholder:text-[#0FA711]/40 border-[#0FA711]/40 resize-none h-40"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Multiple honeypot fields - hidden from users but visible to bots */}
          <FormField
            control={form.control}
            name="honeypot"
            render={({ field }) => (
              <FormItem>
                <input
                  {...field}
                  type="text"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="honeypot2"
            render={({ field }) => (
              <FormItem>
                <input
                  {...field}
                  type="text"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="honeypot3"
            render={({ field }) => (
              <FormItem>
                <input
                  {...field}
                  type="text"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
              </FormItem>
            )}
          />
          {message && (
            <div
              className={`flex items-center gap-2 ${
                message.type === "success" ? "text-green-500" : "text-red-500"
              }`}
            >
              {message.type === "success" ? (
                <CheckIcon className="w-4 h-4" />
              ) : (
                <XIcon className="w-4 h-4" />
              )}
              <span>{message.text}</span>
            </div>
          )}
          <Button
            variant="green"
            size="lg"
            className="w-full text-white"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send"}
          </Button>
        </form>
      </Form>
    </GoogleReCaptchaProvider>
  );
};

export default ContactForm;
