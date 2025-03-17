import Link from "next/link";
import Image from "next/image";
import db from "../events.json";
import Heading from "./ui/heading";

const PastEvents = () => {
  return (
    <div
      className="flex flex-col gap-4 pb-20 md:pb-40 px-4 md:px-0"
      id="past-events"
    >
      <Heading title="Past Events" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {db.events
          .filter((event) => event.id !== db.next_event && event.yt_uuid) // Only show events with YouTube videos (past events)
          .reverse()
          .map((event) => (
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
