import React from "react";
import { NavLink } from "react-router";

const NavigationTab = ({ path, title, Icon }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `flex items-center gap-1 pl-6 py-2  ${isActive ? " border-r-4 border-(--text-primary) bg-(--primary)" : ""}`
      }end
      to={path}
    >
      <Icon size={18} />
      {title}
    </NavLink>
  );
};

export default NavigationTab;
