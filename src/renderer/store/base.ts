import { action, observable } from 'mobx';
import { omit } from 'lodash';
import { generate as id } from 'shortid';

import { Store } from './index';
import { BasicInfo, DataStorage, FullRecordType } from '../../utils/storage/storage';

// Used to display and modification
export type BriefRecordType<T> = BasicInfo & T;

export abstract class BasicTableWithEditStore<T> {
    @observable database: DataStorage<FullRecordType<T>>;

    @observable activeKey: string | null = null;

    @observable activeRecord: BriefRecordType<T> | null = null;

    @observable changesMade = false;

    public root: Store;

    public STORED_PATH: string[] = [];

    public abstract STORE_NAME: string;

    public abstract DEFAULT_STORE: BriefRecordType<T>;

    protected constructor(rootStore: Store, database: DataStorage<FullRecordType<T>>) {
        this.root = rootStore;
        this.database = database;
    }

    public async tableList(): Promise<FullRecordType<T>[]> {
        return this.database.list();
    }

    public async queryWithKeyInList(key: string) {
        return this.database.get({ key });
    }

    @action
    public createNew() {
        this.changesHappen(false);
        this.activeKey = id();
        this.activeRecord = this.DEFAULT_STORE;
    }

    @action
    public resetActive() {
        this.activeRecord = null;
        this.activeKey = null;
        this.changesHappen(false);
    }

    @action
    public changesHappen(hasChanges = true) {
        this.changesMade = hasChanges;
    }

    @action
    public updateActiveRecord(value: BriefRecordType<T>) {
        this.activeRecord = value;
        this.changesHappen();
    }

    @action
    public async edit(key: string) {
        const entry = await this.database.get({ key });
        if (!entry) {
            throw new Error(`'edit()' No matching record.`);
        }
        this.changesHappen(false);
        this.activeKey = key;
        const { name, description } = entry;
        this.activeRecord = { name, description, ...entry.params };
        // Side effect
        await this.onEdit();
    }

    @action
    public async save() {
        if (!this.activeRecord || !this.activeRecord.name) {
            const error = `'Name' cannot be left empty.`;
            throw new Error(error);
        }
        const { name, description } = this.activeRecord;
        const params: any = omit(this.activeRecord, ['name', 'description']);
        const origin = await this.database.get({ key: this.activeKey });

        // New record
        if (!origin) {
            await this.saveAs(name);
        } else {
            origin.name = name;
            origin.description = description;
            origin.params = params;
            await this.database.update({ key: this.activeKey }, { name, description, params });
        }

        this.changesHappen(false);
    }

    public async saveAs(name: string) {
        const key = id();
        if (!this.activeRecord) {
            throw new Error(`saveAs(): No valid active record editing.`);
        }
        const { description } = this.activeRecord;
        const params: any = omit(this.activeRecord, ['name', 'description']);
        const toAdd = {
            key,
            name,
            description,
            params
        };
        await this.database.create(toAdd);
        // Active new key
        return this.edit(key);
    }

    @action
    public async deleteRecord(key: string) {
        if (key === this.activeKey) {
            this.resetActive();
        }
        return this.database.remove({ key });
    }

    @action
    public cancel() {
        this.resetActive();
    }

    public onEdit() {
        return Promise.resolve();
    }
}
