const { app, ipcMain, nativeImage, Tray, Menu } = require("electron");
const { createAppWindow } = require("./app-process");
const startServer = require("./appServer");
const isDev = require("electron-is-dev");
const path = require("path");

let mainWindow = null;
let trayIcon = null;

async function showWindow() {
  try {
    if (isDev) {
      mainWindow = createAppWindow();
    } else {
      startServer(function () {
        mainWindow = createAppWindow();
        checkUpdates();
      });
    }
  } catch (err) {
    console.error("creating auth window...!", err);
  }
}

ipcMain.on("QUIT-APP", (event, message) => {
  app.quit();
});

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
  app.on("activate", function () {
    try {
      mainWindow.show();
    } catch (e) {
      console.error(e);
    }
  });
  app.on("ready", function () {
    app.userAgentFallback = "Chrome";
    showWindow();

    try {
      const contextMenu = Menu.buildFromTemplate([
        {
          label: "Quit",
          click: function () {
            app.quit();
          },
        },
      ]);

      const imgInstance = nativeImage.createFromPath(
        path.join(__dirname, "logo512.png")
      );

      trayIcon = new Tray(imgInstance.resize({ height: 16, width: 16 }));
      trayIcon.setToolTip("React Electron App");
      trayIcon.setContextMenu(contextMenu);
      trayIcon.on("click", () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
      });
    } catch (error) {
      console.error(error);
    }
  });
}

app.on("window-all-closed", () => {
  app.quit();
});
