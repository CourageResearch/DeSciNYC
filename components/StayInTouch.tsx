import React from "react";
import Heading from "./ui/heading";
import { Button } from "./ui/button";
import Link from "next/link";

const StayInTouch = () => {
  return (
    <div className="flex flex-col gap-4 pb-20 md:pb-40 px-4 md:px-0">
      <Heading title="Stay In Touch" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className=" flex flex-col border border-[#202020] gap-2 p-4">
          <h3 className="font-Jersey15 text-3xl uppercase">Calendar</h3>
          <div className="bg-[#2A2A2A] h-[2px] w-full" />
          <p className="text-xl text-muted-foreground font-Jersey10">
            A curated selection of local science events in New York City and the
            surrounding area.
          </p>
          <Link href="https://lu.ma/descinyc" target="_blank">
            <Button
              variant="green"
              size="lg"
              className="w-min mt-12 text-lg font-bold text-white"
            >
              Subscribe to the calendar
            </Button>
          </Link>
        </div>
        <div className=" flex flex-col border border-[#202020] gap-2 p-4">
          <h3 className="font-Jersey15 text-3xl uppercase">Telegram</h3>
          <div className="bg-[#2A2A2A] h-[2px] w-full" />
          <p className="text-xl text-muted-foreground font-Jersey10">
            Join the Decentralized Science NYC group on Telegram to chat with
            other members.
          </p>
          <Link href="https://t.me/+uAS2PtxCoco0MWUx" target="_blank">
            <Button
              variant="green"
              size="lg"
              className="w-min mt-12 text-lg font-bold text-white"
            >
              Join the telegram group
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StayInTouch;
