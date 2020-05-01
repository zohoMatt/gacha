import { action, autorun, computed, observable, toJS } from 'mobx';
import { omit } from 'lodash';
import { v4 } from 'uuid';
import { Storage } from '../../utils/localStore';

export interface Params<T> {
    params: T;
}

export interface KeyID {
    key: string;
}

export interface BasicInfo {
    name: string;
    description: string;
    manufacture?: string;
}

export interface InputSwitcherType {
    use: boolean;
    value: number;
}

export interface SwitcherType {
    use: boolean;
}

// Used to store into local files
export type FullRecordType<T> = KeyID & BasicInfo & Params<T>;

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

    public STORED_PATH: string[] = [];

    public abstract STORE_NAME: string;

    @computed get tableList(): FullRecordType<T>[] {
        return this.database.props;
    }

    protected constructor(storedPath: string[]) {
        this.database = Storage.read(storedPath) || { props: [] };
        this.STORED_PATH = storedPath;
        autorun(async () => {
            return this.listeners();
        });
    }

    public async listeners() {
        try {
            await Storage.update(this.STORED_PATH, toJS(this.database));
            console.log(`${this.STORE_NAME}::autorun Storage updated successfully.`);
        } catch (e) {
            console.error(`${this.STORE_NAME}::autorun Storage failed in updating.`);
        }
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
    public changeParams(value: BriefRecordType<T>) {
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

    public abstract createNew(): void;
}
