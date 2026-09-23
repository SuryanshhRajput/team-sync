import {
  CheckCircle,
  File,
  LayoutDashboard,
  List,
  MessageCircle,
  PersonStanding,
  Settings,
  WorkflowIcon,
} from "lucide-react";

export let employeeNavigation = [
  {
    path: "/home",
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: "/home/mytask",
    title: "My-Task",
    icon: List,
  },
  {
    path: "/home/chat",
    title: "Chats",
    icon: MessageCircle,
  },
  {
    path: "/home/attendance",
    title: "Attendance",
    icon: CheckCircle,
  },
  {
    path: "/home/profile",
    title: "Profile",
    icon: PersonStanding,
  },
  {
    path: "/home/settings",
    title: "Setting",
    icon: Settings,
  },
];

export let adminNavigation = [
  {
    path: "/home",
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: "/home/task",
    title: "Task",
    icon: List,
  },
  {
    path: "/home/chat",
    title: "Chats",
    icon: MessageCircle,
  },
  {
    path: "/home/department",
    title: "Departments",
    icon: PersonStanding,
  },
  {
    path: "/home/employee",
    title: "employee",
    icon: WorkflowIcon,
  },
  {
    path: "/home/document",
    title: "Documents",
    icon: File,
  },
  {
    path: "/home/settings",
    title: "Setting",
    icon: Settings,
  },
];
