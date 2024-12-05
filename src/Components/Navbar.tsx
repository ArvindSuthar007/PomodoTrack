import { useState } from "react";
import Report from "../assets/report.svg";
import Settings from "../assets/settings.svg";
import User from "../assets/user.svg";
import SettingsDialog from "./SettingsDialog";

const NavButton = ({
  Type,
  source,
}: {
  Type: "Report" | "Settings" | "User";
  source: string;
}) => {
  const sizeMap: Record<string, number> = {
    Report: 20,
    Settings: 16,
    User: 24,
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleNavButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <>
      <button
        onClick={handleNavButtonClick}
        className="bg-white/20 min-w-auto px-1.5 py-0.5 text-sm flex items-center justify-center rounded active:translate-y-0.5 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500"
        aria-label={`${Type} button`}
      >
        <img
          src={source}
          alt={`${Type} icon`}
          width={sizeMap[Type]}
          height={sizeMap[Type]}
          className="mr-0.5"
        />
        {Type}
      </button>
      {Type === "Settings" && (
        <SettingsDialog isOpen={isDialogOpen} onClose={handleCloseDialog} />
      )}
    </>
  );
};

const Navbar = () => {
  return (
    <div className="min-w-[38.75rem] py-4 flex justify-between items-center border-b-2 border-black/10">
      <span className="text-2xl font-ArialRoundedBold">Pomodo Track</span>
      <div className="flex gap-2">
        <NavButton Type="Report" source={Report} />
        <NavButton Type="Settings" source={Settings} />
        <NavButton Type="User" source={User} />
      </div>
    </div>
  );
};

export default Navbar;
