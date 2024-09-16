import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { DateTime } from "luxon";
import { LumaEvent } from "@/types/interfaces";

export default function Hero({ lumaEvent }: { lumaEvent: LumaEvent }) {
  return (
    <div className="min-h-screen flex items-start lg:items-center pt-8 lg:pt-0">
      <div className="mx-auto max-w-7xl px-0 lg:px-8 w-full">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-center">
          <div className="lg:col-span-1 px-6 lg:px-0">
            <div className="flex flex-row gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl text-center lg:text-left">
                Welcome to Decentralized Science NYC.
              </h1>
            </div>

            <p className="lg:block mt-6 text-sm leading-2 text-gray-900 text-center lg:text-left">
              A monthly NYC meetup for science enthusiasts to learn, share
              projects, and socialize. We believe science is for everyone, and
              we try to make it accessible to all.
            </p>

            {/* Move the button container here */}
            <div className="mt-6 flex flex-col items-center lg:items-start">
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
            </div>

            {/* Image div now comes after the button */}
            <div className="mt-6 lg:hidden w-screen -mx-6">
              <Image
                src={lumaEvent.cover_url}
                alt="DeSci NYC Logo"
                width={1000}
                height={1000}
                objectFit="cover"
                className="w-full h-86 object-cover"
              />
            </div>
          </div>

          <div className="mt-10 lg:mt-0 lg:col-span-1 hidden lg:flex flex-col items-center lg:items-end">
            <Image
              src={lumaEvent.cover_url}
              alt="DeSci NYC Logo"
              width={500}
              height={500}
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
