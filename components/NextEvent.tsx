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
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl pb-14">
                Next Event!
              </h2>

              <h3 className="mt-2 text-lg font-bold tracking-tight text-gray-900 sm:text-2xl">
                {lumaEvent.name}
              </h3>

              <h2 className="text-base font-semibold leading-7 text-gray-700 mt-4">
                {DateTime.fromISO(lumaEvent.start_at)
                  .setZone("America/New_York")
                  .toLocaleString(DateTime.DATETIME_FULL)}{" "}
                in NYC
              </h2>

              {/* <div className="mt-6 text-lg leading-8 text-gray-900">
                                {lumaEvent.description.split('More chatting\n', 1)[0].concat('More chatting\n').split('\n').map((line, i) => (
                                    <div key={i}
                                        className="block mt-3"
                                    >
                                        {line}
                                    </div>
                                ))}
                            </div> */}

              <div className="mt-6 text-lg leading-8 text-gray-900 mb-7">
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

              {/* <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                {features.map((feature) => (
                                    <div key={feature.name} className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-900">
                                            <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                                            {feature.name}
                                        </dt>{' '}
                                        <dd className="inline">{feature.description}</dd>
                                    </div>
                                ))}
                            </dl> */}
            </div>

            <a
              target="_blank"
              href={lumaEvent.url}
              className="inline-flex rounded-md bg-green-900 px-3.5 
                            py-2.5 text-sm font-semibold text-white shadow-sm 
                            hover:bg-green-700
                            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                            focus-visible:outline-white
                            "
            >
              RSVP
            </a>

            <div className="mt-10">
              <QRCode url={lumaEvent.url + "?utm_source=qr"} />
            </div>
          </div>

          <Image
            src="https://images.unsplash.com/photo-1576670159375-8beb7c963ead?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  );
}
