const { app, BrowserWindow,Menu  } = require('electron');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');


let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        }
    });


    win.loadURL(`file://${path.join(__dirname, 'dist', 'gem-pulse', 'index.html')}`);

    
    win.on('closed', () => {
        win = null;
    });
    

}




app.on('ready', ()=>{
    
    
    createWindow();

    win.webContents.on('did-finish-load', () => {
        win.webContents.setZoomFactor(0.7);
      });
    

    Menu.setApplicationMenu(null);
    win.on('resize', () => {
        win.webContents.setZoomFactor(0.7);
    });


});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
        win.webContents.on('did-finish-load', () => {
            win.webContents.setZoomFactor(0.7);
          });
    }
});



