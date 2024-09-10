import { LumaEvent } from "../types/interfaces";
import { DateTime } from "luxon";
import Image from "next/image";
import QRCode from "./QRCode";

export default function NextEvent({ lumaEvent }: { lumaEvent: LumaEvent }) {
  return (
    <div
      className="overflow-hidden bg-green-400 py-24 sm:py-32"
      id="next-event"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 pb-14">
                Next Event!
              </h2>

              <h3 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {lumaEvent.name}
              </h3>

              <h2 className="text-base font-semibold leading-7 text-black mt-4">
                {DateTime.fromISO(lumaEvent.start_at)
                  .setZone("America/New_York")
                  .toLocaleString(DateTime.DATETIME_FULL)}{" "}
                in NYC
              </h2>

              <div className="mt-6 text-md leading-8 text-gray-900 mb-7">
                {lumaEvent.description
                  .split("🐦")[0]
                  .trim()
                  .split("\n")
                  .map((line, i) => (
                    <p key={i} className="mt-3">
                      {line}
                    </p>
                  ))}
              </div>
            </div>

            <a
              target="_blank"
              href={lumaEvent.url}
              className="inline-flex w-full sm:w-auto justify-center rounded-md bg-green-900 px-3.5 
                            sm:px-6 md:px-8 lg:px-10
                            py-2.5 text-sm font-semibold text-white shadow-sm 
                            hover:bg-green-700
                            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                            focus-visible:outline-white
                            "
            >
              RSVP
            </a>
          </div>

          {/* New right column content */}
          <div className="lg:pl-8 lg:pt-4">
            {/* <div className="aspect-w-16 aspect-h-9 mb-8">
              <Image
                src={lumaEvent.cover_url || "/placeholder-image.jpg"}
                alt={lumaEvent.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div> */}
            <div className="mt-10 flex flex-col items-center text-black">
              <QRCode url={lumaEvent.url + "?utm_source=qr"} />
              <p className="mt-4">Scan to RSVP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
