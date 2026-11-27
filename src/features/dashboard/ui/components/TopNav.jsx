import { Bell, LightbulbIcon, Menu, Moon, Search } from "lucide-react";
import React from "react";
import { toggleTheme } from "../../../../shared/state/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { logoutApi } from "../../../auth/apis/authApi";
import { removeEmployee } from "../../../auth/state/auth/authSlice";
import { toast } from "react-toastify";

const TopNav = () => {
  const { mode } = useSelector((store) => store.theme);
  let dispatch = useDispatch();
  let handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  // hanlde logout through authAPI

  let handleLogout = async () => {
    try {
      await logoutApi();
      dispatch(removeEmployee());
      toast.success("Logged out successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Unable to log out.");
    }
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
      <div className="flex gap-4 items-center">
        {mode === "light" ? (
          <Moon onClick={handleThemeChange} size={23} />
        ) : (
          <LightbulbIcon onClick={handleThemeChange} size={23} />
        )}

        <Bell size={23} />
        <Menu size={23} />
        <button
          onClick={handleLogout}
          className=" text-(--danger) font-bold border-2 rounded-2xl   px-2 py-2"
        >
          {" "}
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopNav;
