import { action, autorun, computed, observable, toJS } from 'mobx';
import { omit } from 'lodash';
import { v4 } from 'uuid';

import { Store } from './init';
import { DataFileStorage } from '../app';

// todo
export interface QuantityValue {
    value: number;
    unit?: string | null;
    display: string | number;
}

export interface Params<T> {
    params: T;
}

export interface KeyID {
    key: string;
}

export interface BasicInfo {
    name: string;
    description: string;
    manufacturer?: string;
}

export interface RecordStatus {
    draft?: boolean;
    cited?: string[];
}

// Used to store into local files
export type FullRecordType<T> = KeyID & BasicInfo & Params<T> & RecordStatus;

// Used to display and modification
export type BriefRecordType<T> = BasicInfo & T;

export interface DataBaseType<T> {
    [key: string]: FullRecordType<T>[];
}

export abstract class BasicTableWithEditStore<T> {
    @observable database: DataBaseType<T> = { props: [] };

    @observable activeKey: string | null = null;

    @observable activeRecord: BriefRecordType<T> | null = null;

    @observable changesMade = false;

    public root: Store;

    public STORED_PATH: string[] = [];

    public abstract STORE_NAME: string;

    public abstract DEFAULT_STORE: BriefRecordType<T>;

    @computed get tableList(): FullRecordType<T>[] {
        return this.database.props;
    }

    protected constructor(storedPath: string[], rootStore: any) {
        this.root = rootStore;
        this.database = DataFileStorage.read(storedPath) || { props: [] };
        this.STORED_PATH = storedPath;
        autorun(async () => {
            return this.listeners();
        });
    }

    public async listeners() {
        try {
            await DataFileStorage.update(this.STORED_PATH, toJS(this.database));
            console.log(`${this.STORE_NAME}::autorun Storage updated successfully.`);
        } catch (e) {
            console.error(`${this.STORE_NAME}::autorun Storage failed in updating.`);
        }
    }

    public queryWithKeyInList(key: string) {
        return this.tableList.find(r => r.key === key);
    }

    @action
    public createNew() {
        this.changesHappen(false);
        this.activeKey = v4();
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
    public edit(key: string) {
        this.changesHappen(false);
        this.activeKey = key;
        const entry = this.tableList.find(r => r.key === key);
        if (!entry) {
            throw new Error(`'edit()' No matching record.`);
        }
        const { name, description } = entry;
        this.activeRecord = { name, description, ...entry.params };
    }

    @action
    public save() {
        if (!this.activeRecord || !this.activeRecord.name) {
            const error = `'Name' cannot be left empty.`;
            throw new Error(error);
        }
        const { name, description } = this.activeRecord;
        const params: any = omit(this.activeRecord, ['name', 'description']);
        const origin = this.tableList.find(p => p.key === this.activeKey);

        // New record
        if (!origin) {
            this.saveAs(name);
        } else {
            origin.name = name;
            origin.description = description;
            origin.params = params;
        }

        this.changesHappen(false);
    }

    public saveAs(name: string) {
        const key = v4();
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
        this.database.props = [toAdd].concat(this.tableList);
        // Active new key
        this.edit(key);
    }

    @action
    public deleteRecord(key: string) {
        if (key === this.activeKey) {
            this.resetActive();
        }
        this.database.props = this.tableList.filter(r => r.key !== key);
    }

    @action
    public cancel() {
        this.resetActive();
    }
}
