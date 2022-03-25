import { ipcRenderer } from "electron";
import { FiSettings } from "react-icons/fi";

export const SidebarData = [
  {
    title: "Change Board",
    cName: "nav-text",
    icon: <FiSettings />,
  },
  {
    title: "Settings",
    cName: "nav-text",
    icon: <FiSettings />,
  },
  {
    title: "Check for updates",
    cName: "nav-text",
    icon: <FiSettings />,
  },
  {
    title: "Sign Out",
    cName: "nav-text",
    icon: <FiSettings />,
    onClick: () => signOutUser(),
  },
  {
    title: "Quit",
    cName: "nav-text",
    icon: <FiSettings />,
    onClick: () => ipcRenderer.send("QUIT-APP", {}),
  },
];
