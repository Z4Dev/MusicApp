import { app, shell, BrowserWindow,ipcMain,Menu,dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1574,
    height: 942,
    minWidth:800,
    minHeight:600,
    resizable:true,
    maximizable:true,
    movable:true,
    center:true,
    webPreferences: {
      worldSafeExecuteJavaScript: true,
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
      DevTools: false,
    },
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      DevTools: false,
    }
  })
  Menu.setApplicationMenu(null)
  mainWindow.setBackgroundColor('rgba(0, 0, 0, 0)')
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


autoUpdater.on("update-available", (_event, releaseNotes, releaseName) => {
  const dialogOpts = {
     type: 'info',
     buttons: ['Ok'],
     title: 'Update Available',
     message: process.platform === 'win32' ? releaseNotes : releaseName,
     detail: 'A new version download started. The app will be restarted to install the update.'
  };
  dialog.showMessageBox(dialogOpts);

  updateInterval = null;
});

autoUpdater.on("update-downloaded", (_event, releaseNotes, releaseName) => {
  const dialogOpts = {
     type: 'info',
     buttons: ['Restart', 'Later'],
     title: 'Application Update',
     message: process.platform === 'win32' ? releaseNotes : releaseName,
     detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  };
  dialog.showMessageBox(dialogOpts).then((returnValue) => {
     if (returnValue.response === 0) autoUpdater.quitAndInstall()
  });
});
