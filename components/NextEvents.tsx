import { LumaEvent } from '@/types/interfaces';
import db from '../db.json';
import { DateTime } from 'luxon';

export default function NextEvents(
    { lumaEvents }: { lumaEvents: LumaEvent[] }
) {



    return (

        <div className="overflow-hidden bg-green-200 py-24 sm:py-32" id='next-events'>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pr-8 lg:pt-4">
                        <div className="lg:max-w-lg">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl pb-14">
                                More Upcoming Events.
                            </h2>

                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-green-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            Event
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {lumaEvents.map((lumaEvent) => {
                                        const cleanedName = lumaEvent.name
                                            .replace(/^DeSciNYC - /, '') // Remove "DeSciNYC - " prefix
                                            .replace(/['"]/g, ''); // Remove any quotes

                                        return (
                                            <tr key={lumaEvent.api_id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {cleanedName}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {DateTime.fromISO(lumaEvent.start_at).toLocaleString(DateTime.DATETIME_FULL)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                                                    <a href={lumaEvent.url} target="_blank" rel="noopener noreferrer"
                                                        className="inline-block px-4 py-2 bg-green-600 text-white font-semibold 
                                text-sm rounded-lg hover:bg-blue-600">
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
            </div>
        </div>

    );

}