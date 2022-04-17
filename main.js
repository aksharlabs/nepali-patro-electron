// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, document } = require('electron');
const path = require('path');
const shell = require('electron').shell;

const { setupTitlebar, attachTitlebarToWindow } = require('custom-electron-titlebar/main');
// setup the titlebar main process
setupTitlebar();

createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 680,
    height: 700,
    titleBarStyle: 'hidden',
      transparent: true,
     
    roundedCorners: true,
    frame: false, // needed if process.versions.electron < 14
    webPreferences: {
nodeIntegration:true,
nativeWindowOpen: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  const menu = Menu.buildFromTemplate(exampleMenuTemplate());
  Menu.setApplicationMenu(menu);



  // and load the index.html of the app.
  mainWindow.loadFile('index.html');

 

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  //attach fullscreen(f11 and not 'maximized') && focus listeners
  attachTitlebarToWindow(mainWindow);
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
})


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
})

const exampleMenuTemplate = () => [
  // { role: 'fileMenu' }
  {
    label: app.name,
    submenu: [
      { role: 'quit' }
    ]
  },
  
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
        { role: 'close' }
      ]
    
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'source code',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://github.com/aksharlabs/nepali-patro-electron')
        }
      },

{  // <---- ADDED
        label: 'About',  // <---- ADDED
        accelerator: "F1",  // <---- ADDED
        click: async () => {  // <---- ADDED
          createAboutWindow();  // <---- ADDED
        }  // <---- ADDED
      },  // <---- ADD
    ]
  }
];
async function createAboutWindow () {  // <---- ADDED
  // Define our main window size
  const childWindow = new BrowserWindow({  // <---- ADDED
    height: 525,  // <---- ADDED
    width: 500,  // <---- ADDED
   titleBarStyle: 'hidden',
    frame: false,
    show: false,  // <---- ADDED
    minimizable: false,  // <---- ADDED
    nativeWindowOpen: true,
    maximizable: false,  // <---- ADDED
    parent: BrowserWindow,  // <---- ADDED
    modal: true,
    transparent: true,
    // icon: __dirname + '/Icon/Icon.icns',  // <---- ADDED
    webPreferences: { 
nativeWindowOpen: true, // <---- ADDED
      nodeIntegration: true,  // <---- ADDED
      preload: path.join(__dirname, 'electron', 'dist', 'electron-bridge.js')  // <---- ADDED
    }  // <---- ADDED
  });  // <---- ADDED

  childWindow.removeMenu();  // <---- ADDED
  childWindow.loadURL(`file://${__dirname}/about.html`);  // <---- ADDED
  childWindow.webContents.on('dom-ready', () => {  // <---- ADDED
    childWindow.show();  // <---- ADDED
  });  // <---- ADDED
  // <---- ADDED

}