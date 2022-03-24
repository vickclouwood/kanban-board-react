import { ipcRenderer } from "electron";
import { getAuth, signOut } from "firebase/auth";
// import { FiSettings } from "react-icons/fi";
const signOutUser = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

export const SidebarData = [
  {
    title: "Change Board",
    cName: "nav-text",
    // icon: "FiSettings",
  },
  {
    title: "Settings",
    cName: "nav-text",
    // icon: "FiSettings",
  },
  {
    title: "Check for updates",
    cName: "nav-text",
    // icon: "FiSettings",
  },
  {
    title: "Sign Out",
    cName: "nav-text",
    // icon: "FiSettings",
    onClick: () => signOutUser(),
  },
  {
    title: "Quit",
    cName: "nav-text",
    // icon: "FiSettings",
    onClick: () => ipcRenderer.send("QUIT-APP", {}),
  },
];
