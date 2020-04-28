/**
 * This is for the renderer process ONLY
 */
import { ipcRenderer } from 'electron';

export class IPCRequest {
    public static getReplyChannel(channel: string) {
        return `${channel}@reply`;
    }

    public static send(channel: string, data: any, options?: any) {

        const promise = new Promise((resolve, reject) => {
            ipcRenderer.on(IPCRequest.getReplyChannel(channel), (event: any, arg: any) => {
                resolve(arg);
            });
        });
        ipcRenderer.send(channel, data);
        return promise;
    }
}
