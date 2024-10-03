import db from "../db.json";
import Image from "next/image";

export default function PastEvents() {
  return (
    <div className="" id="past-events">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
          Past Events.
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-12">
          {db.events
            .slice()
            .reverse()
            .map((event) => {
              if (event.yt_uuid !== "") {
                return (
                  <div
                    key={event.yt_uuid}
                    className="group relative"
                    id={event.id + ""}
                  >
                    <div
                      className="rounded-md group-hover:opacity-75"
                      style={{
                        position: "relative",
                        width: "100%",
                        paddingBottom: "56.25%", // 16:9 Aspect Ratio
                        overflow: "hidden",
                        backgroundColor: "#000", // Black background
                      }}
                    >
                      <a
                        href={`https://www.youtube.com/watch?v=${event.yt_uuid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={`https://i3.ytimg.com/vi/${event.yt_uuid}/maxresdefault.jpg`}
                          alt=""
                          fill
                          style={{
                            objectFit: "cover",
                          }}
                        />
                      </a>
                    </div>
                    <div className="mt-4 flex justify-between text-gray-900">
                      <div>
                        <h3 className="text-sm font-semibold">
                          <a
                            href={`https://www.youtube.com/watch?v=${event.yt_uuid}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {event.title}
                          </a>
                        </h3>
                        <h3 className="text-sm">
                          <a
                            href={`https://www.youtube.com/watch?v=${event.yt_uuid}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {event.speaker}
                          </a>
                        </h3>
                      </div>
                    </div>
                    <h3 className="text-sm mt-2 text-black">
                      <a
                        href={event.luma_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Luma Event
                      </a>
                    </h3>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
}
