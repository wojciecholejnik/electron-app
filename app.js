const {app, BrowserWindow, ipcMain} = require('electron')
    const url = require("url");
    const path = require("path");
    const ipc = ipcMain;

    let mainWindow

    function createWindow () {
      mainWindow = new BrowserWindow({
        width: 1440,
        height: 900,
        webPreferences: {
          nodeIntegration: true,
          webSecurity: false,
          enableRemoteModule: true
        },
        frame: true,
        icon: __dirname + '/src/assets/favicons/favicon.ico',
      })

      mainWindow.setMenuBarVisibility(false);

      mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, `/dist/electron-app/index.html`),
          protocol: "file:",
          slashes: true
        })
      );
      // Open the DevTools.
      // mainWindow.webContents.openDevTools()

      mainWindow.on('closed', function () {
        mainWindow = null
      })
    }

    app.on('ready', createWindow)

    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') app.quit()
    })

    app.on('activate', function () {
      if (mainWindow === null) createWindow()
    })

    ipc.on('close', () => { mainWindow.close() })