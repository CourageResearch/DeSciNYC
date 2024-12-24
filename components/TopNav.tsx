import Logo from "./ui/logo";

const TopNav = async () => {
  return (
    <header className="flex justify-between items-center p-4 h-14 bg-gradient-to-r from-[#0d230d] via-[#0F7A11] to-[#0d230d]">
      <div className="max-w-[1100px] mx-auto flex items-center justify-between w-full">
        <Logo />
      </div>
    </header>
  );
};

export default TopNav;
