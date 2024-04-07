/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

'use client'

import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'
import { useForm, ValidationError } from '@formspree/react';

export default function MailingList() {

  const [state, handleSubmit] = useForm("xdoqpkjo");
  if (state.succeeded) {
    return <p>Thanks for joining!</p>;
  }

  return (
    <div className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32" id='mailing-list'>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Subscribe to the mailing list.</h2>
            <p className="mt-4 text-lg leading-8 text-gray-900">

              About once a month, we send out an email with the latest news, events, and updates from
              the decentralized science community in NYC.
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
                  className="min-w-0 flex-auto rounded-md border-0  px-3.5 py-2 
                  text-gray-900 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 
                  focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6
                  bg-white
                  "
                  placeholder="Enter your email"
                />

                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 
                  text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                  focus-visible:outline-indigo-500"
                >
                  Subscribe
                </button>
              </form>

            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                {/* <CalendarDaysIcon className="h-6 w-6 text-gray-900" aria-hidden="true" /> */}
              </div>
              <dt className="mt-4 font-semibold text-gray-900">Find out about events</dt>
              <dd className="mt-2 leading-7 text-gray-900">
                Find out about upcoming events and get the latest news about the decentralized science community in NYC.
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                {/* <HandRaisedIcon className="h-6 w-6 text-white" aria-hidden="true" /> */}
              </div>
              <dt className="mt-4 font-semibold text-gray-900">No spam</dt>
              <dd className="mt-2 leading-7 text-gray-900">
                No spam and we will never share your email address with anyone else.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
