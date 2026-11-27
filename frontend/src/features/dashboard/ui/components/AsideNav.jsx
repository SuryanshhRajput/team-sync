import React from "react";
import NavigationTab from "./NavigationTab";
import { useSelector } from "react-redux";
import {
  adminNavigation,
  employeeNavigation,
} from "../../../../app/constants/navigation";

const AsideNav = () => {
  let { employee } = useSelector((store) => store.auth);
  let navigations =
    employee?.role === "admin" ? adminNavigation : employeeNavigation;

  return (
    <div>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl  pl-6 font-semibold text-[--primary]">team-sync</h1>
        <p className="text-sm pl-6 text-(--text-muted)">Enterprise Workspace</p>
      </div>
      <div className="flex flex-col gap-3   py-8">
        {navigations.map((route) => {
          return (
            <NavigationTab
              key={route.path}
              path={route.path}
              Icon={route.icon}
              title={route.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AsideNav;
