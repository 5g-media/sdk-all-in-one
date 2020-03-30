const electron = require('electron');
const path = require('path');
const { execSync } = require('child_process');

// SET ENV
process.env.NODE_ENV = 'development';

const { app, BrowserWindow, Menu } = electron;
const isDev = require('electron-is-dev');

// Create menu template
const mainMenuTemplate = [
  // Each object is a dropdown
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        },
      },
    ],
  },
];

let mainWindow;
// Listen for app to be ready
app.on('ready', () => {
  // Create new windownpm start
  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, '../src/assets/img/logo/logo_200.png'),
    minWidth: 1300,
    minHeight: 650,
    width: 1300,
    height: 650,
    webPreferences: { webSecurity: false },
  });

  try {
    execSync(
      'docker run --name validation-extract-service -p 9000:9000 -dt docker5gmedia/validation-extract-service',
    );
  } catch (error) {
    console.log('validation-extract-service container already running');
  }

  // Load html in window
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3001'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  );

  // Quit app when closed
  mainWindow.maximize();

  mainWindow.on('close', () => {
    //   <---- Catch close event
    execSync('docker container stop validation-extract-service');
    execSync('docker container rm validation-extract-service');
  });

  mainWindow.on('closed', () => {
    app.quit();
  });

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
});

app.on('certificate-error', (ev, wc, url, error) => {
  console.log('< certificate error: ', error);
});

// If OSX, add empty object to menu
if (process.platform === 'darwin') {
  mainMenuTemplate.unshift({});
}

// Add developer tools option if in dev
if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [
      {
        role: 'reload',
      },
      {
        label: 'Toggle DevTools',
        accelerator: process.platform === 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
    ],
  });
}
