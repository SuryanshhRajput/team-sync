import Chats from "../../features/chats/ui/pages/Chats";
import Home from "../../features/dashboard/ui/pages/Home";
import Settings from "../../features/settings/ui/pages/Settings";

export let commonRoutes = [
  {
    path: "",
    element: <Home />,
  },
  {
    path: "chat",
    element: <Chats />,
  },
  {
    path: "settings",
    element: <Settings />,
  },
];
