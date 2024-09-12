"use client";

import { useState } from "react";
import { handleAddToEmailList } from "@/app/handlers";

export default function FooterEmailForm() {
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
    <div className="mt-10 xl:mt-0">
      <h3 className="text-sm font-semibold leading-6 text-gray-900">
        Subscribe to the DeSci newsletter
      </h3>
      <p className="mt-2 text-sm leading-6 text-black">
        The latest events, news, and resources, sent to your inbox monthly.
      </p>
      <form className="mt-6 sm:flex sm:max-w-md" onSubmit={handleSubmit}>
        <label htmlFor="email-address" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          name="email-address"
          id="email-address"
          autoComplete="email"
          required
          className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
          <button
            disabled={isSubmitting}
            type="submit"
            className="rounded-md bg-green-800 px-3.5 py-2.5 text-sm font-semibold text-white 
                                    shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 
                                    focus-visible:outline-offset-2 focus-visible:outline-green-800"
          >
            Subscribe
          </button>
        </div>
      </form>
      {isSuccess && (
        <p className="text-gray-900 mt-2">Thanks for subscribing!</p>
      )}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
