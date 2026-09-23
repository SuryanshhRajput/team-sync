import { Bell, LightbulbIcon, Menu, Moon, Search } from "lucide-react";
import React from "react";
import { toggleTheme } from "../../../../shared/state/themeSlice";
import { useDispatch, useSelector } from "react-redux";

const TopNav = () => {
  const { mode } = useSelector((store) => store.theme);
  let dispatch = useDispatch();
  let handleThemeChange = () => {
    dispatch(toggleTheme());
  };
  return (
    <div className="flex justify-between items-center ">
      <div className="gap-4 flex items-center w-[30%] rounded-xl px-3 py-2 bg-(--bg-surface) border border-gray-700">
        <Search size={20} />
        <input
          className="outline-0 w-full text-(--bg-primary)"
          type="text"
          class="placeholder:text-(--bg-primary)"
          placeholder="Search WorkSpace"
        />
      </div>{" "}
      <div className="flex gap-4">
        {mode === "light" ? (
          <Moon onClick={handleThemeChange} size={23} />
        ) : (
          <LightbulbIcon onClick={handleThemeChange} size={23} />
        )}

        <Bell size={23} />
        <Menu size={23} />
      </div>
    </div>
  );
};

export default TopNav;
