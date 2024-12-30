"use client";

import { z } from "zod";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { CheckIcon, Loader2, XIcon } from "lucide-react";

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
});

const ContactForm = () => {
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
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setMessage(null);
    try {
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
        throw new Error("Failed to send message");
      }

      setMessage({
        text: "Message sent successfully!",
        type: "success",
      });
      form.reset();
    } catch (error) {
      console.error("Error sending message:", error);
      setMessage({
        text: "Failed to send message. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
  );
};

export default ContactForm;
