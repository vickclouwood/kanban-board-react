import { ipcRenderer } from "electron";
import { getAuth, signOut } from "firebase/auth";

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
  },
  {
    title: "Settings",
    cName: "nav-text",
  },
  {
    title: "Check for updates",
    cName: "nav-text",
  },
  {
    title: "Sign Out",
    cName: "nav-text",
    onClick: () => signOutUser(),
  },
  {
    title: "Quit",
    cName: "nav-text",
    onClick: () => ipcRenderer.send("QUIT-APP", {}),
  },
];
