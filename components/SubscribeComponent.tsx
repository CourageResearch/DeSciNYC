"use client";

import { z } from "zod";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { CheckIcon, Loader2, XIcon } from "lucide-react";
import HorizontalLines from "./ui/HorizontalLines";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "./ui/form";

const formSchema = z.object({
  email: z.string().email(),
});

const SubscribeComponent = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values.email }),
      });

      if (!response.ok) {
        const data = await response.json();
        setMessage({ text: data.error, type: "error" });
        console.error("Subscription failed:", data.error);
        return;
      }

      setMessage({
        text: "Successfully subscribed to mailing list!",
        type: "success",
      });
    } catch (error) {
      console.error("Error subscribing to mailing list:", error);
      setMessage({
        text: "An error occurred while subscribing",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative w-full bg-gradient-to-b from-[#0d230d] to-black"
      id="subscribe"
    >
      <HorizontalLines />
      <div className="max-w-[1100px] mx-auto flex flex-col items-center justify-center">
        <div className="flex flex-col gap-4 my-20 md:my-40 bg-gradient-to-b from-transparent via-[#0fa711] to-transparent px-4 md:px-8 py-12">
          <h3 className="text-stone-200 uppercase text-5xl font-medium font-Jersey15">
            Subscribe to mailing list
          </h3>
          <p className="w-full md:w-2/3 text-stone-200 font-semibold">
            About once a month, we sent out an email with the latest news,
            events, and updates from the decentralized science community in NYC
          </p>
          <Form {...form}>
            <form
              className="flex flex-row mt-2 items-center w-full md:w-2/3"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      className="rounded-none bg-[#0d230d] border-[#0fa711]/40 text-stone-200 placeholder:text-[#0fa711]/40 h-10 w-full relative z-20"
                      required
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="green"
                className="w-40 font-bold text-white h-10 z-20"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          </Form>
          {message && (
            <div
              className={`flex items-center justify-start gap-1 ${
                message.type === "success" ? "text-green-400" : "text-red-400"
              }`}
            >
              {message.type === "success" ? (
                <CheckIcon className="w-4 h-4" />
              ) : (
                <XIcon className="w-4 h-4" />
              )}

              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscribeComponent;
