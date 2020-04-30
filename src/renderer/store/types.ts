import { action, observable, toJS } from 'mobx';
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
    @observable abstract database: DataBaseType<T>;

    @observable activeKey: string | null = null;

    @observable activeRecord: BriefRecordType<T> | null = null;

    @observable changesMade = false;

    public abstract STORED_PATH: string[];

    public abstract STORE_NAME: string;

    abstract get tableList(): FullRecordType<T>[];

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
    public cancel() {
        this.resetActive();
    }

    public abstract createNew(): void;

    public abstract edit(key: string): void;

    public abstract deleteRecord(key: string): void;

    public abstract save(): void;

    public abstract saveAs(name: string): void;
}
