import MyTask from "../../features/employee module/MyTask/ui/pages/MyTask";
import Profile from "../../features/employee module/Profile/ui/pages/Profile";
import Attendance from "../../features/employee module/Attendance/ui/pages/Attendance";
import Document from "../../features/admin module/documents/ui/pages/Document";

export let employeeRoutes = [
  {
    path: "/home/mytask",
    element: <MyTask />,
  },
  {
    path: "/home/attendance",
    element: <Attendance />,
  },
  {
    path: "/home/document",
    element: <Document />,
  },
  {
    path: "/home/profile",
    element: <Profile />,
  },
];
