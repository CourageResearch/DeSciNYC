import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import VerticalLines from "./ui/verticalLines";
import { LumaEvent } from "@/types/events";
import Link from "next/link";

const logos = [
  {
    src: "/images/logo/stadium.png",
    href: "https://stadium.science",
  },

  // {
  //   src: "/images/logo/solana.png",
  //   href: null,
  // },
];

const LandingHero = async ({ event }: { event: LumaEvent }) => {
  return (
    <div className="relative w-full py-16 md:py-24">
      <VerticalLines />
      <div className="flex items-start justify-center mb-2 pt-8">
        <div className="hidden sm:flex-1 sm:flex flex-col gap-2">
          <div className="h-[2px] bg-[#cccccc]"></div>
          <div className="h-[2px] bg-[#cccccc]"></div>
          <div className="h-[2px] bg-[#cccccc]"></div>
        </div>
        <div className="max-w-[1100px] ml-auto w-full flex items-start">
          <div className="flex flex-col gap-4 max-w-[32rem] -mt-8">
            <h1 className="flex flex-col items-start justify-start capitalize text-6xl md:text-7xl mx-4 font-Jersey25 tracking-wide font-medium">
              <p>Welcome to</p>
              <p>Decentralized</p>
              <p>Science NYC</p>
            </h1>
            <p className="mx-4 text-stone-400">
              A monthly NYC meetup for science enthusiasts to learn, share
              projects, and socialize. Science is for everyone, and we try to
              make it accessible to all.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mx-4 mt-8 md:mt-28">
              <Link
                href={event?.event.url}
                className="w-full md:w-2/3"
                target="_blank"
              >
                <Button
                  variant="green"
                  size="lg"
                  className="w-full h-12 md:h-14 normal-case text-lg md:text-xl font-semibold flex-col gap-0"
                >
                  <p>RSVP to next event</p>
                  <p className="text-xs">
                    {new Date(event?.event.start_at).toLocaleString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      timeZone: event?.event.timezone || "America/New_York",
                      timeZoneName: "short",
                    })}
                  </p>
                </Button>
              </Link>
              <Link href="#subscribe" className="w-full md:w-1/2">
                <Button
                  variant="gray"
                  size="lg"
                  className="w-full h-12 md:h-14 text-lg md:text-base font-semibold"
                >
                  Subscribe to Mailing List
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden sm:flex-1 sm:flex flex-col gap-2">
            <div className="h-[2px] bg-[#cccccc]"></div>
            <div className="h-[2px] bg-[#cccccc]"></div>
            <div className="h-[2px] bg-[#cccccc]"></div>
            <div className="flex items-center justify-center p-8">
              <Image
                src="/images/logo/nyc.png"
                alt="hero"
                width={800}
                height={800}
                quality={100}
                className="w-80 object-cover hidden md:block"
              />
            </div>
          </div>
        </div>

        <div className="hidden sm:flex-1 sm:flex flex-col gap-2">
          <div className="h-[2px] bg-[#cccccc]"></div>
          <div className="h-[2px] bg-[#cccccc]"></div>
          <div className="h-[2px] bg-[#cccccc]"></div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between bg-gradient-to-r from-[#0d230d]/60 from-10% via-[#004b00]/60 via-30% to-[#0d230d]/60 to-50% border-y border-[#0FA711]/60 h-14 items-center my-16 md:my-24">
        <div className="flex items-center max-w-[1100px] px-4 h-full mx-auto w-full">
          <div className="flex items-center justify-center gap-4 w-full">
            <p className="mt-0.5">Supported by:</p>
            {logos.map((logo, index) =>
              logo.href ? (
                <Link href={logo.href} target="_blank" key={index}>
                  <Image
                    src={logo.src}
                    alt="logo"
                    width={150}
                    height={60}
                    quality={100}
                    className="h-5 object-contain hover:scale-105 transition-all duration-300"
                  />
                </Link>
              ) : (
                <Image
                  src={logo.src}
                  alt="logo"
                  width={150}
                  height={60}
                  quality={100}
                  key={index}
                  className="h-5 object-contain"
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
