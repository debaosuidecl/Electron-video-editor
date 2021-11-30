const electron = require("electron");
const ffmpeg = require("fluent-ffmpeg")
const {app, BrowserWindow, ipcMain} = electron // overall running electron app process


let mainWindow;
app.on("ready", ()=>{ // event based programminng
    // console.log("App is now ready")

 mainWindow =   new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,          
        contextIsolation: false,        
        enableRemoteModule: true,       
      },
})

mainWindow.loadURL(`file://${__dirname}/views/index.html`);


})


ipcMain.on('video:submit', (event, path)=>{

    console.log("probing file")

    ffmpeg.ffprobe(path, (err, metadata)=>{
        mainWindow.webContents.send('video:metadata', metadata.format.duration);
    })
    
  
})
