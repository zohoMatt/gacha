import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import installExt, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { initIPCService } from './ipc';
import { AppEnv } from '../mods/env';
import { startServer } from './init/downloadExecutable';

let win: BrowserWindow | null;

const installExtensions = async () => {
    const extensions = [REACT_DEVELOPER_TOOLS, 'pfgnfdagidkfgccljigdamigbcnndkod'];
    return Promise.all(extensions.map(ext => installExt(ext)));
};

const createWindow = async () => {
    if (process.env.APP_ENV !== AppEnv.Production) {
        await installExtensions();
    }

    win = new BrowserWindow({
        width: 1920,
        height: 1080,
        frame: true,
        title: 'GACha',
        // fixme https://www.electronjs.org/docs/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true
        }
    });

    if (process.env.APP_ENV === AppEnv.Dev) {
        process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1'; // eslint-disable-line require-atomic-updates
        await win.loadURL(`http://localhost:2003`);
    } else {
        await win.loadURL(
            url.format({
                pathname: path.join(__dirname, 'index.html'),
                protocol: 'file:',
                slashes: true
            })
        );
    }

    if (process.env.APP_ENV !== AppEnv.Production) {
        // Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
        win.webContents.once('dom-ready', () => {
            win!.webContents.openDevTools();
        });
    }

    win.on('closed', () => {
        win = null;
    });
};

app.on('ready', () => {
    // 1. Init logger
    // Logger.init();
    // 2. init IPC listeners
    initIPCService();
    startServer();
    // 3. others
    createWindow();
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
