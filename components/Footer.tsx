import Logo from "./ui/logo";

const Footer = () => {
  return (
    <div className="flex items-center justify-center h-20 gap-4">
      <div className="flex flex-col gap-1 w-full">
        <div className="w-full h-[2px] bg-gray-200" />
        <div className="w-full h-[2px] bg-gray-200" />
        <div className="w-full h-[2px] bg-gray-200" />
      </div>
      <Logo />
      <div className="flex flex-col gap-1 w-full">
        <div className="w-full h-[2px] bg-gray-200" />
        <div className="w-full h-[2px] bg-gray-200" />
        <div className="w-full h-[2px] bg-gray-200" />
      </div>
    </div>
  );
};

export default Footer;
