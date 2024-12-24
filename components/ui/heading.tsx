const Heading = ({ title }: { title: string }) => {
  return (
    <div className="flex gap-2 items-center">
      <h3 className="font-Jersey10 text-5xl uppercase text-[#0FA711] whitespace-nowrap">
        {title}
      </h3>
      <div className="flex flex-col gap-3 w-full">
        <div className="w-full h-[2px] bg-[#CCCCCC]"></div>
        <div className="w-full h-[2px] bg-[#CCCCCC]"></div>
      </div>
    </div>
  );
};

export default Heading;
