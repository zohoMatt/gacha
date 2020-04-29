import { app, remote } from 'electron';
import * as fs from 'fs-extra';
import * as path from 'path';
import { set as setObj, get } from 'lodash';

export class Storage {
    public static userDataPath = '';

    public static data: any = {};

    public static init({ filename }: any) {
        Storage.userDataPath = path.join(
            (app || remote.app).getPath('appData'),
            `${filename}.json`
        );
        console.info(`Current user data path: ${Storage.userDataPath}`);
    }

    public static async update(keyPath: string[] | string, value: any) {
        const newData = setObj(Storage.data, keyPath, value);
        return fs.writeFile(Storage.userDataPath, JSON.stringify(newData));
    }

    public static async import() {
        Storage.data = await fs.readJSON(Storage.userDataPath);
    }

    public static read(keyPath: string[] | string) {
        return get(Storage.data, keyPath);
    }
}
