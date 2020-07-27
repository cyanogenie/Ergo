const electron = require('electron')
const path = require('path')
const remote = electron.remote
const BrowserWindow = electron.remote.BrowserWindow

const beginBtn = document.getElementById('beginbtn')

beginBtn.addEventListener('click', function (event) {
    const modalPath = path.join('file://', __dirname, 'configure.html')
    
    var homewindow = remote.getCurrentWindow();

    let confwin = new BrowserWindow(
        { //alwaysOnTop: true, 
          width: 600,
          height: 500 ,
          minimizable: false,
          maximizable: false,
          webPreferences: {
            nodeIntegration: true
          }
        })
    confwin.on('close', function () { confwin = null })
    confwin.loadURL(modalPath)
    confwin.show()
    //confwin.webContents.openDevTools()
  //   confwin.on('minimize',function(event){
  //     event.preventDefault()
  //     confwin.focus()
  // })

    homewindow.close();

})