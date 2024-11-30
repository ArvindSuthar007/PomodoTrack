import Report from "../assets/report.svg";
import Settings from "../assets/settings.svg";
import User from "../assets/user.svg";

const NavSpan = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="bg-white/20 min-w-auto px-1.5 py-0.5 text-sm flex items-center justify-center rounded active:translate-y-0.5 select-none">
      {children}
    </span>
  );
};

const Navbar = () => {
  return (
    <div className="min-w-[38.75rem] py-4 flex justify-between items-center border-b-2 border-black/10">
      <span className="text-2xl font-ArialRoundedBold">Pomodo Track</span>
      <div className="flex gap-2">
        <NavSpan>
          <img
            src={Report}
            alt="Report_icon"
            width={20}
            height={20}
            className="mr-1"
          />{" "}
          Report
        </NavSpan>
        <NavSpan>
          <img
            src={Settings}
            alt="Settings_icon"
            width={16}
            height={16}
            className="mr-1"
          />{" "}
          Settings
        </NavSpan>
        <NavSpan>
          <img
            src={User}
            alt="User_icon"
            width={24}
            height={24}
            className="mr-0.5"
          />{" "}
          User
        </NavSpan>
      </div>
    </div>
  );
};

export default Navbar;
