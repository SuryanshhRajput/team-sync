import { Bell, Menu, Search } from "lucide-react";
import React from "react";

const TopNav = () => {
  return (
    <div className="flex justify-between items-center ">
      <div className="gap-4 flex items-center w-[30%] rounded-xl px-3 py-2 bg-[var(--bg-surface)] border border-gray-700">
        <Search size={20} />
        <input className="outline-0 w-full" type="text" placeholder="Search WorkSpace" />
      </div>{" "}
      <div className="flex gap-4">
        <Bell size={23} />
        <Menu size={23} />
      </div>
    </div>
  );
};

export default TopNav;
