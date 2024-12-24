import React from "react";
import Heading from "./ui/heading";
import { Button } from "./ui/button";
import Link from "next/link";

const SupportUs = () => {
  return (
    <div className="flex flex-col gap-4 pb-20 md:pb-40 px-4 md:px-0">
      <Heading title="Support Us" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className=" flex flex-col border border-[#202020] gap-2 p-4">
          <h3 className="font-Jersey15 text-3xl uppercase">Volunteer</h3>
          <div className="bg-[#2A2A2A] h-[2px] w-full" />
          <p className="text-xl text-muted-foreground font-Jersey10">
            Be part of the team that makes Decentralized Science NYC happen.
            Join us and help shape the future of science.
          </p>
          <Link
            href="https://docs.google.com/forms/u/0/d/e/1FAIpQLSciOPsEjUNdlc4sv5PUuqOLLmriUPwb59Ryu9cxko-9jUj5XQ/viewform?usp=send_form&pli=1"
            target="_blank"
          >
            <Button
              variant="green"
              size="lg"
              className="w-min mt-12 text-lg font-bold text-white"
            >
              Volunteer
            </Button>
          </Link>
        </div>
        <div className=" flex flex-col border border-[#202020] gap-2 p-4">
          <h3 className="font-Jersey15 text-3xl uppercase">Sponsorship</h3>
          <div className="bg-[#2A2A2A] h-[2px] w-full" />
          <p className="text-xl text-muted-foreground font-Jersey10">
            Help us make DeSciNYC even better with fundas that will go toward
            space and food.
          </p>
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSfbRV9Vz8WYftlFn-gpl0tEo4ivQ95Px3R9ig7qJl4DJpuFsg/viewform"
            target="_blank"
          >
            <Button
              variant="green"
              size="lg"
              className="w-min mt-12 text-lg font-bold text-white"
            >
              Sponsor
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SupportUs;
