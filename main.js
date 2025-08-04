const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow(){
  const win = new BrowserWindow({
    width: 600,    // lățime potrivită pentru calculator + TVA
    height: 750,   // înălțime potrivită (ajustează după conținut)
    resizable: false,  // blochează redimensionarea
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // dacă-l folosești
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  win.loadFile('index.html');
  win.setMenu(null);  // opțional, elimină meniul aplicației (curat)
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') app.quit();
});
