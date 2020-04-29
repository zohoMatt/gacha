import { app, remote } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { set as setObj } from 'lodash';

export class Storage {
    public userDataPath: string = (app || remote.app).getPath('appData');

    public data: any = { first: { second: { third: 3 } } };

    constructor({ name }: any) {
        this.userDataPath = path.join(this.userDataPath, `${name}.json`);
        console.info(`Current user data path: ${this.userDataPath}`);
    }

    public async update(keyPath: string[] | string, value: string | number | void) {
        const newData = setObj(this.data, keyPath, value);
        await promisify(fs.writeFile)(this.userDataPath, JSON.stringify(newData));
    }
}
