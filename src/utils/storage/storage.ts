import { app, remote } from 'electron';
import * as path from 'path';
import * as low from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';
import { StorageDataStructure, StorageInitOptions } from './types';

export class DataStorage<T> {
    public static VERSION = '0.1.0';

    public userDataPath: string;

    public database: any;

    public defaultStore: StorageDataStructure<T> = { version: DataStorage.VERSION, data: [] };

    public constructor(opt: StorageInitOptions<T>) {
        const { filename, defaultStore } = opt;

        this.userDataPath = path.join((app || remote.app).getPath('appData'), `${filename}.json`);
        console.info(`Current user data path: ${this.userDataPath}`);

        if (defaultStore) this.defaultStore = defaultStore;
    }

    public async import() {
        const adapter = new FileAsync(this.userDataPath);
        this.database = await low(adapter);
        return this.database.defaults(this.defaultStore).write();
    }

    public async update(condition: object, value: object) {
        return this.database
            .get('data')
            .find(condition)
            .assign(value)
            .write();
    }

    public async create(value: T) {
        return this.database
            .get('data')
            .push(value)
            .write();
    }

    public async get(condition: object): Promise<T | undefined> {
        const query = await this.database
            .get('data')
            .filter(condition)
            .value();
        if (query) return query[0];
        return undefined;
    }

    public async remove(condition: object) {
        return this.database
            .get('data')
            .remove(condition)
            .write();
    }

    public async list(): Promise<T[]> {
        return this.database.get('data').value();
    }
}
