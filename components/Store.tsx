import Link from "next/link";
import { Button } from "./ui/button";
import Heading from "./ui/heading";
import Image from "next/image";

const Store = () => {
  return (
    <div className="flex flex-col gap-4 pb-20 md:pb-40 px-4 md:px-0">
      <Heading title="Store" />
      <div className="flex flex-col md:flex-row border border-[#202020] p-4 md:p-8 gap-4">
        <div className="flex flex-col gap-2 items-center justify-center w-full md:w-2/5">
          <Image
            src="/images/t-shirt.png"
            alt="Event Image"
            width={400}
            height={400}
            className="border border-[#202020] p-4"
          />
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <Image
                key={i}
                src="/images/t-shirt.png"
                alt="Event Image"
                width={200}
                height={200}
                className="border border-[#202020] p-4"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2 w-full md:w-3/5">
          <h4 className="font-Jersey10 text-4xl">DeSciNYC T-Shirt</h4>
          <h5 className="text-[#0FA711] text-2xl font-semibold">$19.38</h5>
          <p className="text-muted-foreground font-semibold">
            Introducing the {"DeSciNYC T-Shirt"}- the ultimate fusion of science
            and NewYork City vibes! Unleash your inner urban explorer whether
            tour navigating the concre jungle or the wet lab
          </p>
          <p className="text-muted-foreground font-semibold uppercase">Color</p>
          <div className="size-12 border border-[#202020] aspect-square bg-zinc-800" />
          <Link href="https://descinyc.creator-spring.com/" target="_blank">
            <Button
              variant="green"
              size="lg"
              className="h-12 mt-4 text-xl font-bold w-80 bg-[#0FA711]/60 text-white"
            >
              ORDER
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Store;
