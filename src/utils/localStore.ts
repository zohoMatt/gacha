import { app, remote } from 'electron';
import * as fs from 'fs-extra';
import * as path from 'path';
import { set as setObj, get } from 'lodash';

export class Storage {
    public userDataPath: string;

    public data: any;

    constructor({ filename }: any) {
        this.userDataPath = path.join((app || remote.app).getPath('appData'), `${filename}.json`);
        console.info(`Current user data path: ${this.userDataPath}`);
    }

    public async update(keyPath: string[] | string, value: any) {
        const newData = setObj(this.data, keyPath, value);
        return fs.writeFile(this.userDataPath, JSON.stringify(newData));
    }

    public async import() {
        this.data = await fs.readJSON(this.userDataPath);
    }

    public read(keyPath: string[] | string) {
        return get(this.data, keyPath);
    }
}
