"use client";

import { useState } from "react";
import { handleAddToEmailList } from "@/app/handlers";

export default function MailingList() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await handleAddToEmailList(email);
      setIsSuccess(true);
      setEmail("");
    } catch (err) {
      setError("Failed to add email to list. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32 bg-green-400"
      id="mailing-list"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Subscribe to the mailing list.
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-900">
              About once a month, we send out an email with the latest news,
              events, and updates from the decentralized science community in
              NYC.
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <form onSubmit={handleSubmit}>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 
                  text-gray-900 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 
                  focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6
                  bg-white mr-5"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md bg-green-800 px-3.5 py-2.5 text-sm font-semibold text-white 
                  shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 
                  focus-visible:outline-offset-2 focus-visible:outline-green-800"
                >
                  Subscribe
                </button>
              </form>
            </div>
            {isSuccess && (
              <p className="text-gray-900 mt-2">Thanks for joining!</p>
            )}
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
