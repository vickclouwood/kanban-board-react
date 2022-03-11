const { BrowserWindow, Menu } = require("electron");
const electron = require("electron");
const isDev = require("electron-is-dev");

let mainWindow;
function createAppWindow() {
  let display = electron.screen.getPrimaryDisplay();
  let screenHeight = display.bounds.height;
  let screenWidth = display.bounds.width;
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 600,
    minWidth: 800,
    alwaysOnTop: false,
    x: (screenWidth - 800) / 2,
    y: (screenHeight - 600) / 2,
    resizable: true,
    frame: true,
    visualEffectState: "active",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      nativeWindowOpen: true,
      contextIsolation: false,
      javascript: true,
      nodeIntegrationInSubFrames: true,
    },
  });

  mainWindow.loadURL(`http://localhost:4321`);
  if (isDev) {
    mainWindow.webContents.openDevTools({
      mode: "undocked",
    });
  }

  let template = [];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  mainWindow.setMenu(null);
  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  return mainWindow;
}

module.exports = { createAppWindow };
