import { ipcRenderer } from "electron";
import { FiSettings } from "react-icons/fi";
import { BsKanban } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";
import { GoSignOut } from "react-icons/go";
import { GiExitDoor } from "react-icons/gi";

export const SidebarData = [
  {
    title: "Change Board",
    cName: "nav-text",
    icon: <BsKanban />,
  },
  {
    title: "Settings",
    cName: "nav-text",
    icon: <FiSettings />,
  },
  {
    title: "Check for updates",
    cName: "nav-text",
    icon: <GrUpdate />,
  },
  {
    title: "Sign Out",
    cName: "nav-text",
    icon: <GoSignOut />,
    onClick: () => signOutUser(),
  },
  {
    title: "Quit",
    cName: "nav-text",
    icon: <GiExitDoor />,
    onClick: () => ipcRenderer.send("QUIT-APP", {}),
  },
];
