import { LumaEvent } from "@/types/interfaces";
import { DateTime } from "luxon";

export default function NextEvents({
  lumaEvents,
}: {
  lumaEvents: LumaEvent[];
}) {
  return (
    <div
      className="overflow-hidden bg-green-300 py-12 sm:py-24"
      id="next-events"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-6 sm:mb-10">
          Upcoming Events.
        </h2>

        <div className="flex flex-wrap justify-start gap-6 sm:gap-16">
          {lumaEvents.map((event, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-72 gap-2 sm:gap-4"
            >
              <p className="mt-2 text-lg font-semibold text-center text-black">
                {event.name}
              </p>
              <div className="w-full overflow-hidden rounded-lg shadow-md">
                <img
                  src={event.cover_url}
                  alt={event.name || `Event ${index + 2}`}
                  className="w-full h-auto object-contain"
                />
              </div>

              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-md bg-green-800 px-3.5 py-2.5 text-sm font-semibold text-white 
                  shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 
                  focus-visible:outline-offset-2 focus-visible:outline-green-800 text-center"
              >
                RSVP for{" "}
                {DateTime.fromISO(event.start_at)
                  .setZone("America/New_York")
                  .toLocaleString(DateTime.DATE_FULL)}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
