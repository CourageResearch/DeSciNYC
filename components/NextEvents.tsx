import Link from "next/link";
import QRCode from "./QRCode";
import Image from "next/image";
import Heading from "./ui/heading";
import { Button } from "./ui/button";
import { LumaEvent } from "@/types/events";

const NextEvents = async ({ events }: { events: LumaEvent[] }) => {
  // Filter out past events
  const upcomingEvents = events.filter(
    (event) => new Date(event.event.start_at) > new Date()
  );

  // If no upcoming events, show a message
  if (upcomingEvents.length === 0) {
    return (
      <div className="flex flex-col gap-4 pb-20 md:pb-40 px-4 md:px-0">
        <Heading title="Next Events" />
        <div className="border border-[#202020] p-4">
          <p className="text-xl">
            No upcoming events scheduled. Check back soon!
          </p>
        </div>
      </div>
    );
  }

  // Parse schedule from description
  const scheduleLines = upcomingEvents[0].event.description
    .split("\n")
    .filter((line) => line.includes("PM:"))
    .map((line) => {
      const [time, activity] = line.split(": ");
      return { time, activity };
    });

  return (
    <div className="flex flex-col gap-4 pb-20 md:pb-40 px-4 md:px-0">
      <Heading title="Next Events" />
      <div className="flex flex-col md:flex-row border border-[#202020] p-4 gap-4">
        <div className="flex flex-col justify-center gap-2 w-full md:w-3/5">
          <h4 className="font-Jersey10 text-4xl">
            {upcomingEvents[0].event.name}
          </h4>
          <h5 className="text-[#0FA711] text-xl font-semibold">
            {new Date(upcomingEvents[0].event.start_at).toLocaleDateString(
              "en-US",
              {
                month: "long",
                day: "numeric",
                year: "numeric",
              }
            )}{" "}
            at{" "}
            {new Date(upcomingEvents[0].event.start_at).toLocaleTimeString(
              "en-US",
              {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
                timeZone: "America/New_York",
              }
            )}{" "}
            in NYC
          </h5>
          <p className="text-muted-foreground font-semibold">
            Presented by: DeSciNYC, SS, Binance, Movement and Arch Lending.
          </p>
          <QRCode url={upcomingEvents[0].event.url + "?utm_source=qr"} />
          <Link
            href={upcomingEvents[0].event.url}
            target="_blank"
            className="w-min mt-4"
          >
            <Button
              variant="green"
              size="lg"
              className="h-12 text-xl font-bold w-full md:w-96 bg-[#0FA711]/60 text-white"
            >
              RSVP
            </Button>
          </Link>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center w-full md:w-2/5">
          <Image
            src={upcomingEvents[0].event.cover_url}
            alt="Event Image"
            width={400}
            height={400}
          />
        </div>
      </div>
      {/* Schedule  */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scheduleLines.map((item, index) => (
          <div
            key={index}
            className="flex flex-col border border-[#202020] gap-2 p-4"
          >
            <h3 className="font-Jersey15 uppercase text-3xl">
              {item.activity}
            </h3>
            <div className="bg-[#2A2A2A] h-[2px] w-full" />
            <p className="text-3xl text-[#0FA711] font-Jersey10">{item.time}</p>
          </div>
        ))}
      </div>

      {upcomingEvents.length > 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-20">
          {upcomingEvents.slice(1).map((event, index) => (
            <div
              key={index}
              className="flex flex-col border border-[#202020] gap-2 p-4 h-full"
            >
              <div className="flex flex-col flex-grow">
                <h3 className="font-Jersey15 text-3xl">{event.event.name}</h3>
                <div className="bg-[#2A2A2A] h-[2px] w-full" />
                <div className="flex flex-col gap-2 items-start justify-center w-full my-2">
                  <Image
                    src={upcomingEvents[index + 1].event.cover_url}
                    alt="Event Image"
                    width={400}
                    height={400}
                    className="w-4/5 h-full object-cover"
                  />
                </div>
                <p className="text-2xl text-[#0FA711] font-Jersey10">
                  {new Date(event.event.start_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  at{" "}
                  {new Date(event.event.start_at).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                    timeZone: "America/New_York",
                  })}{" "}
                  EST in NYC
                </p>
              </div>
              <Link href={event.event.url} target="_blank" className="w-min">
                <Button
                  variant="green"
                  size="lg"
                  className="w-32 text-lg font-bold"
                >
                  RSVP
                </Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NextEvents;
