import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { DateTime } from "luxon";
import { LumaEvent } from "@/types/interfaces";
import Link from "next/link";

export default function Hero({ lumaEvent }: { lumaEvent: LumaEvent }) {
  return (
    <div className="min-h-screen flex items-start lg:items-center pt-8 lg:pt-0">
      <div className="mx-auto max-w-7xl px-0 lg:px-8 w-full">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-center">
          <div className="lg:col-span-1 px-6 lg:px-0">
            <div className="flex flex-col lg:flex-row gap-2">
              <img
                src="/images/descinyc-logo.png"
                className="block lg:hidden w-20 sm:w-28 md:w-32 lg:w-48 mx-auto lg:mx-0"
                style={{ height: "auto", maxWidth: "min(15vw, 192px)" }}
              />
              <h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-gray-900 text-center lg:text-left"
                style={{ fontSize: "clamp(1.5rem, 4vw, 3.75rem)" }}
              >
                Welcome to Decentralized Science NYC.
              </h1>
              <img
                src="/images/descinyc-logo.png"
                className="hidden lg:block w-20 sm:w-28 md:w-32 lg:w-48 mx-auto lg:mx-0 lg:order-last"
                style={{ height: "auto", maxWidth: "min(15vw, 192px)" }}
              />
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

            <div className="mt-4 lg:mt-8 text-black flex flex-col items-center lg:items-start gap-0 lg:gap-2">
              <h1>Supported By</h1>
              <div className="flex flex-row gap-6 items-end mt-2 sm:mt-0">
                <Link href="https://www.svn.haus" className="flex items-end">
                  <img
                    src="/images/SVN.png"
                    alt="SVN"
                    width={100}
                    height={0}
                    className="h-6 sm:h-8 md:h-10 lg:h-[30px] w-auto"
                  />
                </Link>
                <Link href="https://www.base.org/" className="flex items-end">
                  <img
                    src="/images/Base.png"
                    alt="Base"
                    width={100}
                    height={0}
                    className="h-5 sm:h-6 md:h-8 lg:h-6 w-auto"
                  />
                </Link>
              </div>
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
