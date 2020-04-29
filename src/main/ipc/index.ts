import { ipcMain } from 'electron';
import { fileStorage } from './subMods/fileStorage';
import { Logger } from '../../utils/logger';

export function initIPCService() {
    [fileStorage].forEach(mod => {
        const {prefix} = mod;
        for (const listener of mod.listeners) {
            const requestChannel = `${prefix}-${listener.channel}`;
            Logger.log.trace(`ipcMain: Starting listening on ${requestChannel}`);
            ipcMain.on(requestChannel, (event: any, arg: any) => {
                Logger.log.trace(`${requestChannel}: received data ${JSON.stringify(arg)}`);
                const data = listener.listener(event, arg);
                Logger.log.trace(`${requestChannel}@reply: To reply with ${JSON.stringify(data)}`);
                event.sender.send(`${requestChannel}@reply`, data);
            });
        }
    });
}
