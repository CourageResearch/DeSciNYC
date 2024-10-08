"use client";

import { useState } from "react";
import { handleAddContactFormResponse } from "../app/handlers";

export default function ContactUs() {
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormStatus("idle");
    setErrorMessage("");

    const formElement = event.currentTarget;

    const formData = new FormData(event.currentTarget);

    try {
      const result = await handleAddContactFormResponse(
        formData.get("full-name") as string,
        formData.get("email") as string,
        formData.get("phone-number") as string,
        formData.get("message") as string
      );

      console.log(result);

      if (result.success) {
        setFormStatus("success");
        // Reset form
        formElement.reset(); // Un-commented this line
      } else {
        setFormStatus("error");
        setErrorMessage(result.error || "An unknown error occurred");
      }
    } catch (error) {
      console.error("Error saving to Supabase:", error);
      setFormStatus("error");
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="relative isolate" id="contact-us">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pb-8 pt-12 sm:pb-20 sm:pt-24 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Contact Us.
            </h2>
            <p className="mt-4 sm:mt-6 text-lg leading-8 text-gray-900">
              {
                "We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible."
              }
            </p>
          </div>
        </div>
        <form
          onSubmit={onSubmit}
          className="px-6 pb-24 pt-8 sm:pt-20 sm:pb-32 lg:px-8 lg:py-48"
        >
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="full-name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="full-name"
                    id="full-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 
                    px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                    placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                    focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Email *
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Phone number
                </label>
                <div className="mt-2.5">
                  <input
                    type="tel"
                    name="phone-number"
                    id="phone-number"
                    autoComplete="tel"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Message *
                </label>
                <div className="mt-2.5">
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-green-800 px-3.5 py-2.5 text-sm font-semibold text-white 
                shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 
                focus-visible:outline-offset-2 focus-visible:outline-green-800"
              >
                Send message
              </button>
            </div>
            {formStatus === "success" && (
              <p className="text-green-600 mt-2">
                Thanks for the message! Your message has been saved
                successfully.
              </p>
            )}
            {formStatus === "error" && (
              <p className="text-red-600 mt-2">
                {errorMessage ||
                  "There was an error saving your message. Please try again later."}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
