import { LumaEvent } from "@/types/interfaces";
import { DateTime } from "luxon";

export default function NextEvents({
  lumaEvents,
}: {
  lumaEvents: LumaEvent[];
}) {
  return (
    <div
      className="overflow-hidden bg-green-200 py-12 sm:py-24"
      id="next-events"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-6 sm:mb-10">
          More Upcoming Events
        </h2>

        {/* Mobile view */}
        <div className="sm:hidden space-y-4">
          {lumaEvents.map((lumaEvent) => {
            const cleanedName = lumaEvent.name
              .replace(/^DeSciNYC - /, "")
              .replace(/['"]/g, "");

            return (
              <div
                key={lumaEvent.api_id}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <h3 className="font-semibold text-lg mb-2 text-gray-900">
                  {cleanedName}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {DateTime.fromISO(lumaEvent.start_at).toLocaleString(
                    DateTime.DATETIME_FULL
                  )}
                </p>
                <a
                  href={lumaEvent.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-2 bg-green-500 text-white font-semibold 
                  text-sm rounded-lg hover:bg-green-400 transition-colors"
                >
                  RSVP
                </a>
              </div>
            );
          })}
        </div>

        {/* Desktop view */}
        <div className="hidden sm:block">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-400">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Event
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                ></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lumaEvents.map((lumaEvent) => {
                const cleanedName = lumaEvent.name
                  .replace(/^DeSciNYC - /, "")
                  .replace(/['"]/g, "");

                return (
                  <tr key={lumaEvent.api_id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {cleanedName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {DateTime.fromISO(lumaEvent.start_at).toLocaleString(
                        DateTime.DATETIME_FULL
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                      <a
                        href={lumaEvent.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 bg-green-500 text-white font-semibold 
                        text-sm rounded-lg hover:bg-green-400"
                      >
                        RSVP
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
