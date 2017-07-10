const {app, BrowserWindow} = require('electron');
const dialog = require('electron').dialog;
var childProcess = require('child_process');

let win;

var openFile = function() {
    var files = dialog.showOpenDialog(win, {
        properties: ['openFile'],
        filters: [
            { name: 'MRIQA XML-Files', extensions: ['xml'] },
            { name: 'All Files', extensions: ['*']}
        ]
    });
    if(!files) {
        return;
    }
    var file = files[0];
    return file;
};

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function createWindow (process) {
    // Create the browser window.
    win = new BrowserWindow({width: 1024, height: 768, title: 'MRIQA-GUI', icon:'public/img/icon.png'});
    win.maximize();
    // Disable menu bar
    win.setMenu(null);

    delay(1000).then(() => { // nasty workaround -> promise request throws timeout
        win.loadURL('http://localhost:3000/');
    });

    // Emitted when the window is closed.
    win.on('closed', () => {
        process.kill();
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}

function fGenerateApp() {
    // invoke child process (remote application)
    var invoked = false;
    var options = { stdio: [null, null, null, 'ipc'] };
    var args = process.argv.slice(2);
    var nodeJsProcess = childProcess.fork('./index.js', args, options);

    // listen for errors as they may prevent the exit event from firing
    nodeJsProcess.on('error', (err) => {
        if(invoked){
            return;
        }
        invoked = true;
        if(err){
            throw err;
        }
    });
    nodeJsProcess.on('message', (data) => {
        if(data === 'openDialog'){
            var file = openFile();
            if(file){
                nodeJsProcess.send(file);
            }
            else{
                nodeJsProcess.send(null);
            }
        }
    });

    nodeJsProcess.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    createWindow(nodeJsProcess);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', fGenerateApp);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});