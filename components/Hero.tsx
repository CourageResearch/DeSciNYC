import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { DateTime } from "luxon";
import { LumaEvent } from "@/types/interfaces";

export default function Hero({ lumaEvent }: { lumaEvent: LumaEvent }) {
  return (
    <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
      <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
        <div className="mx-auto max-w-2xl lg:mx-0">
          {/* <img
                            className="h-11"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        /> */}
          <div className="hidden sm:mt-32 sm:flex lg:mt-16">
            {/* <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                                Anim aute id magna aliqua ad ad non deserunt sunt.{' '}
                                <a href="#" className="whitespace-nowrap font-semibold text-indigo-600">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    Read more <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div> */}
          </div>
          <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
            Welcome to Decentralized Science NYC.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-900">
            {/* A monthly meetup for the decentralized science community in NYC to learn
                            about the latest in decentralized science, share projects, and eat. */}
            A monthly NYC meetup for science enthusiasts to learn, share
            projects, and socialize.
            {/* Join us for a monthly IRL meetup in NYC about decentralized science. */}
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-900">
            Science is for everyone, and we try to make it accessible to all.
          </p>

          <div className="mt-10 flex items-center gap-x-6">
            <a
              href={lumaEvent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-green-800 px-3.5 py-2.5 text-sm font-semibold text-white 
                                shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 
                                focus-visible:outline-offset-2 focus-visible:outline-green-800"
            >
              RSVP to Next Event on{" "}
              {DateTime.fromISO(lumaEvent.start_at).toLocaleString(
                DateTime.DATE_FULL
              )}
            </a>
            <a
              href="#mailing-list"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Join the mailing list <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
      <div className="lg:col-span-5 flex items-center justify-center">
        <Image
          src="/images/logo-hero2.png"
          alt="DeSci NYC Logo"
          width={500}
          height={500}
          objectFit="contain"
        />
      </div>
    </div>
  );
}
