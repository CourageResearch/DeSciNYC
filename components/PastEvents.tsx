import Link from "next/link";
import Image from "next/image";
import Heading from "./ui/heading";
import { supabase } from "@/lib/supabaseClient";

// Function to fetch Luma event data
async function getLumaEvent(lumaId: string) {
  if (!process.env.LUMA_API_KEY) {
    console.error("LUMA_API_KEY is not defined");
    return null;
  }

  const config = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-luma-api-key": process.env.LUMA_API_KEY,
    },
  };

  try {
    const response = await fetch(
      `https://api.lu.ma/public/v1/event/get?api_id=${lumaId}`,
      config
    );
    if (!response.ok) {
      console.error(`Failed to fetch Luma event ${lumaId}:`, response.status, response.statusText);
      return null;
    }
    return response.json();
  } catch (error) {
    console.error(`Failed to fetch Luma event ${lumaId}:`, error);
    return null;
  }
}

const PastEvents = async () => {
  // Fetch past events from Supabase
  const { data: pastEvents } = await supabase
    .from('events')
    .select('*')
    .eq('active', false);

  // Fetch Luma event data for each event
  const pastEventsWithLumaData = await Promise.all(
    (pastEvents || []).map(async (event) => {
      try {
        const lumaData = await getLumaEvent(event.luma_id);
        return {
          ...event,
          lumaEvent: lumaData?.event || null
        };
      } catch (err) {
        console.error(`Error fetching Luma data for event:`, err);
        return event;
      }
    })
  );

  // Sort by lumaEvent.start_at descending (most recent first)
  pastEventsWithLumaData.sort((a, b) => {
    const aDate = a.lumaEvent?.start_at ? new Date(a.lumaEvent.start_at).getTime() : 0;
    const bDate = b.lumaEvent?.start_at ? new Date(b.lumaEvent.start_at).getTime() : 0;
    return bDate - aDate;
  });

  return (
    <div
      className="flex flex-col gap-4 pb-20 md:pb-40 px-4 md:px-0"
      id="past-events"
    >
      <Heading title="Past Events" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pastEventsWithLumaData?.map((event) => (
          <div
            key={event.id}
            className="flex flex-col border border-[#202020] h-full border-b-4 border-r-4"
          >
            <Link
              href={`https://www.youtube.com/watch?v=${event.yt_uuid}`}
              className="relative w-full aspect-video"
              target="_blank"
            >
              <Image
                src={`https://i3.ytimg.com/vi/${event.yt_uuid}/sddefault.jpg`}
                alt={event.title}
                fill
                className="object-cover"
              />
            </Link>
            <div className="flex flex-col justify-start items-start gap-4 p-4 flex-grow">
              <Link
                href={`https://www.youtube.com/watch?v=${event.yt_uuid}`}
                target="_blank"
                className="text-lg font-bold line-clamp-2 hover:text-[#0FA711] transition-all ease-in-out duration-300"
              >
                {event.title}
              </Link>
              <p className="text-sm text-gray-500">{event.speaker}</p>
              <div className="flex flex-col gap-2">
                <Link
                  href={`https://www.youtube.com/watch?v=${event.yt_uuid}`}
                  target="_blank"
                  className="text-sm uppercase text-white hover:underline transition-all duration-300 ease-in-out"
                >
                  Video
                </Link>
                <Link
                  href={event.luma_url}
                  target="_blank"
                  className="text-sm uppercase text-white hover:underline transition-all duration-300 ease-in-out"
                >
                  Luma event
                </Link>
                {event.slides && (
                  <Link
                    href={`/slides/${event.slides}`}
                    target="_blank"
                    className="text-sm uppercase text-white hover:underline transition-all duration-300 ease-in-out"
                  >
                    Slides
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastEvents;
