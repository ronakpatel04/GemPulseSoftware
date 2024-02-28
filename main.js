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
            nodeIntegration: true
        }
    });

    win.loadURL(`file://${path.join(__dirname, 'dist', 'gem-pulse', 'index.html')}`);

    win.on('closed', () => {
        win = null;
    });
}

function buildAngularProject(angularProjectDirectory) {
    // Delete the dist directory to ensure a clean build
    const distDirectory = path.join(angularProjectDirectory, 'dist');
    if (fs.existsSync(distDirectory)) {
        fs.rmdirSync(distDirectory, { recursive: true });
    }

    // Run ng build command
    exec('ng build --base-href ./', { cwd: angularProjectDirectory }, (err, stdout, stderr) => {
        if (err) {
            console.error('Error building Angular project:', err);
            return;
        }

        console.log(stdout);
        console.error(stderr);

        createWindow();
    });
}


app.on('ready', ()=>{
    createWindow();
    // const angularProjectDirectory = path.join(__dirname, 'dist', 'my-electron-app');
    
    // Start watching all files in the Angular project directory
    // buildAngularProject(angularProjectDirectory);
    Menu.setApplicationMenu(null);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});



