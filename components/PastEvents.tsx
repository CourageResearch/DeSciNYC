import Image from "next/image";
import Heading from "./ui/heading";
import db from "../events.json";
import Link from "next/link";

const PastEvents = () => {
  return (
    <div className="flex flex-col gap-4 pb-20 md:pb-40 px-4 md:px-0">
      <Heading title="Past Events" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {db.events
          .filter((event) => event.id !== db.next_event)
          .reverse()
          .map((event) => (
            <Link
              key={event.id}
              href={`https://www.youtube.com/watch?v=${event.yt_uuid}`}
              className="flex flex-col border border-[#202020] h-full border-b-4 border-r-4"
            >
              <div className="relative w-full aspect-video">
                <Image
                  src={`https://i3.ytimg.com/vi/${event.yt_uuid}/sddefault.jpg`}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-start items-start gap-4 p-4 flex-grow">
                <h3 className="text-lg font-bold line-clamp-2">
                  DeSciNYC: {event.title}
                </h3>
                <p className="text-sm text-gray-500">{event.speaker}</p>
                <p className="text-sm uppercase text-white">Luma event</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PastEvents;
