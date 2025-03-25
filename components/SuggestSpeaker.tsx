"use client";

import { z } from "zod";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, Loader2, XIcon } from "lucide-react";
import { Form, FormField, FormItem, FormMessage } from "./ui/form";

const formSchema = z.object({
  yourName: z.string().min(2, "Name must be at least 2 characters"),
  yourEmail: z.string().email(),
  speakerName: z.string().min(2, "Speaker name must be at least 2 characters"),
  speakerEmail: z.string().email(),
  speakerBio: z.string().min(10, "Please provide a brief bio of the speaker"),
});

const SuggestComponent = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      yourName: "",
      yourEmail: "",
      speakerName: "",
      speakerEmail: "",
      speakerBio: "",
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

      const response = await fetch("/api/suggest-speaker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        setMessage({ text: data.error, type: "error" });
        console.error("Speaker suggestion failed:", data.error);
        return;
      }

      setMessage({
        text: "Thank you for your speaker suggestion!",
        type: "success",
      });
      form.reset();
    } catch (error) {
      console.error("Error suggesting speaker:", error);
      setMessage({
        text: "An error occurred while submitting your suggestion",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="flex flex-row gap-4 mb-20 md:mb-40 border border-[#00F703]/30 bg-[#0fa711]/40 px-4 md:px-8 py-12 w-full">
        <div className="flex flex-col gap-4 items-start w-full md:w-1/2">
          <h3 className="text-stone-200 uppercase text-5xl font-medium font-Jersey15">
            Suggest a Speaker
          </h3>
          <p className="w-full md:w-2/3 text-stone-200 font-semibold">
            Have a speaker in mind for a future event? Suggest them here!
          </p>
        </div>
        <Form {...form}>
          <form
            className="flex flex-col gap-4 mt-2 w-full md:w-1/2"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="yourName"
              render={({ field }) => (
                <FormItem>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="Your Name"
                    className="rounded-none bg-[#0d230d] border-[#0fa711]/40 text-stone-200 placeholder:text-[#0fa711]/40 h-10 w-full"
                    required
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yourEmail"
              render={({ field }) => (
                <FormItem>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="Your Email"
                    className="rounded-none bg-[#0d230d] border-[#0fa711]/40 text-stone-200 placeholder:text-[#0fa711]/40 h-10 w-full"
                    required
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="speakerName"
              render={({ field }) => (
                <FormItem>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="Speaker's Name"
                    className="rounded-none bg-[#0d230d] border-[#0fa711]/40 text-stone-200 placeholder:text-[#0fa711]/40 h-10 w-full"
                    required
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="speakerEmail"
              render={({ field }) => (
                <FormItem>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="Speaker's Email"
                    className="rounded-none bg-[#0d230d] border-[#0fa711]/40 text-stone-200 placeholder:text-[#0fa711]/40 h-10 w-full"
                    required
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="speakerBio"
              render={({ field }) => (
                <FormItem>
                  <textarea
                    {...field}
                    disabled={isLoading}
                    placeholder="Speaker's Bio"
                    className="rounded-none bg-[#0d230d] border border-[#0fa711]/40 text-stone-200 placeholder:text-[#0fa711]/40 w-full p-2 min-h-[100px] resize-none"
                    required
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row w-full items-center justify-between">
              <Button
                variant="green"
                className="w-full md:w-40 font-bold text-white h-10"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
              {message && (
                <div
                  className={`flex items-center justify-start gap-1 ${
                    message.type === "success"
                      ? "text-green-400"
                      : "text-red-400"
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
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SuggestComponent;
