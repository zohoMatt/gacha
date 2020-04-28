import { app, remote } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

export class Storage {
    public userDataPath: string = (app || remote.app).getPath('appData');

    public data: any = { first: { second: { third: 3 } } };

    constructor({ name }: any) {
        this.userDataPath = path.join(this.userDataPath, `${name}.json`);
        console.info(`Current user data path: ${this.userDataPath}`);
    }

    public async update(keyPath: string[] | string, value: string | number | void) {
        if (typeof keyPath === 'string') {
            this.data[keyPath] = value;
        } else {
            let origin = this.data;
            for (const key of keyPath.slice(0, keyPath.length - 1)) {
                origin = origin[key];
            }
            origin[keyPath.pop()!] = value;
        }
        console.log(this.data);
        await promisify(fs.writeFile)(this.userDataPath, JSON.stringify(this.data));
    }
}
