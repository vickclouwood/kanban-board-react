const { app, ipcMain, nativeImage, Tray, Menu } = require("electron");
const { createAppWindow } = require("./app-process");
const startServer = require("./appServer");
const isDev = require("electron-is-dev");
const path = require("path");
// import { autoUpdater } from "electron-updater";
// const { autoUpdater } = require("electron-updater");

// const log = require("electron-log");

//Logging
// autoUpdater.logger = log;
// autoUpdater.logger.transports.file.level = "info";
// log.info("App starting...");

//Open a window that displays the version
// let win;

// function sendStatusToWindow(text) {
//   log.info(text);
//   win.webContents.send("message", text);
// }
// function createDefaultWindow() {
//   win = new BrowserWindow({
//     webPreferences: {
//       nodeIntegration: true,
//       contextIsolation: false,
//     },
//   });
//   win.webContents.openDevTools();
//   win.on("closed", () => {
//     win = null;
//   });
//   win.loadURL(`file://${__dirname}/version.html#v${app.getVersion()}`);
//   return win;
// }
// autoUpdater.on("checking-for-update", () => {
//   sendStatusToWindow("Checking for update...");
// });
// autoUpdater.on("update-available", (info) => {
//   sendStatusToWindow("Update available.");
// });
// autoUpdater.on("update-not-available", (info) => {
//   sendStatusToWindow("Update not available.");
// });
// autoUpdater.on("error", (err) => {
//   sendStatusToWindow("Error in auto-updater. " + err);
// });
// autoUpdater.on("download-progress", (progressObj) => {
//   let log_message = "Download speed: " + progressObj.bytesPerSecond;
//   log_message = log_message + " - Downloaded " + progressObj.percent + "%";
//   log_message =
//     log_message +
//     " (" +
//     progressObj.transferred +
//     "/" +
//     progressObj.total +
//     ")";
//   sendStatusToWindow(log_message);
// });
// autoUpdater.on("update-downloaded", (info) => {
//   sendStatusToWindow("Update downloaded");
// });
// app.on("ready", function () {
//   // Create the Menu
//   const menu = Menu.buildFromTemplate(template);
//   Menu.setApplicationMenu(menu);

//   createDefaultWindow();
// });
// app.on("window-all-closed", () => {
//   app.quit();
// });

//Auto-updates
// app.on("ready", function () {
//   autoUpdater.checkForUpdates();
// });
// autoUpdater.on("checking-for-update", () => {});
// autoUpdater.on("update-available", (info) => {});
// autoUpdater.on("update-not-available", (info) => {});
// autoUpdater.on("error", (err) => {});
// autoUpdater.on("download-progress", (progressObj) => {});
// autoUpdater.on("update-downloaded", (info) => {
//   autoUpdater.quitAndInstall();
// });

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
