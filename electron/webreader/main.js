const { app, BrowserWindow } = require('electron');
const windowStateKeeper = require('electron-window-state');

let mainWindow;

const createWindow = () => {
  let state = windowStateKeeper({
    defaultWidth: 500,
    defaultHeight: 650,
  });

  mainWindow = new BrowserWindow({
    x: state.x,
    y: state.y,
    width: state.width,
    height: state.height,
    minWidth: 350,
    maxWidth: 650,
    minHeight: 300,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  state.manage(mainWindow);

  mainWindow.loadFile('renderer/main.html');
  mainWindow.webContents.openDevTools();

  mainWindow.on('close', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});