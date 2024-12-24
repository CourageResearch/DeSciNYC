import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 font-VT323 w-96">
      <Image
        src="/images/logo/nyc.png"
        alt="DeSciNYC"
        width={30}
        height={30}
        className="object-contain w-10"
      />
      <h2 className="text-2xl md:text-3xl font-bold tracking-wide">DeSciNYC</h2>
    </div>
  );
};

export default Logo;
