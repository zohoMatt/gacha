import { ipcMain } from 'electron';
import { fileStorage } from './subMods/fileStorage';

export function initIPCService() {
    [
        fileStorage
    ].forEach(mod => {
        const prefix = mod.prefix;
        for (const listener of mod.listeners) {
            const requestChannel = `${prefix}-${listener.channel}`;
            console.log(`ipcMain: listening on ${requestChannel}`);
            ipcMain.on(requestChannel, (event: any, arg: any) => {
                const data = listener.listener(event, arg);
                console.log(`ipcMain: To reply with ${JSON.stringify(data)} on channel ${requestChannel}@reply`);
                event.sender.send(`${requestChannel}@reply`, data);
            });
        }
    });
}
