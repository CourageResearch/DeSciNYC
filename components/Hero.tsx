import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { DateTime } from "luxon";
import { LumaEvent } from "@/types/interfaces";

export default function Hero({ lumaEvent }: { lumaEvent: LumaEvent }) {
  return (
    <div className="h-screen flex items-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-center">
          <div className="lg:col-span-1">
            <div className="flex flex-row gap-2">
              <h1 className="mt-18 text-3xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl text-center lg:text-left">
                Welcome to Decentralized Science NYC.
              </h1>
              {/* <div className="lg:col-span-1 flex flex-col justify-end items-center h-full">
                <div className="mb-8">
                  <Image
                    src="/images/logo-hero2.png"
                    alt="DeSci NYC Logo"
                    width={400}
                    height={300}
                    objectFit="contain"
                    className="hidden lg:block"
                  />
                </div>
              </div> */}
            </div>

            <p className="mt-6 text-sm leading-2 text-gray-900 text-center lg:text-left">
              A monthly NYC meetup for science enthusiasts to learn, share
              projects, and socialize. We believe Science is for everyone, and
              we try to make it accessible to all.
            </p>

            <div className="flex justify-center lg:hidden mt-6">
              <Image
                src={lumaEvent.cover_url}
                alt="DeSci NYC Logo"
                width={300}
                height={300}
                objectFit="contain"
              />
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center gap-y-4 sm:gap-x-6 lg:justify-start">
              <a
                href={lumaEvent.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto rounded-md bg-green-800 px-3.5 py-2.5 text-sm font-semibold text-white 
                                  shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 
                                  focus-visible:outline-offset-2 focus-visible:outline-green-800 text-center"
              >
                RSVP to Next Event on{" "}
                {DateTime.fromISO(lumaEvent.start_at)
                  .setZone("America/New_York")
                  .toLocaleString(DateTime.DATE_FULL)}
              </a>
              {/* <a
                href="#mailing-list"
                className="w-full sm:w-auto rounded-md border border-gray-900 px-3.5 py-2.5 text-sm font-semibold text-gray-900 
                           shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 
                           focus-visible:outline-offset-2 focus-visible:outline-gray-900 text-center"
              >
                Join the mailing list <span aria-hidden="true">→</span>
              </a> */}
            </div>
          </div>

          <div className="mt-10 lg:mt-0 lg:col-span-1 flex flex-col items-center lg:items-end">
            <Image
              src={lumaEvent.cover_url}
              alt="DeSci NYC Logo"
              width={500}
              height={500}
              objectFit="contain"
              className="hidden lg:block"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
