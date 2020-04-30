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
    props: FullRecordType<T>[];
}

export interface TableWithEditStore<T> {
    database: DataBaseType<T>;
    activeKey: string | null;
    activeRecord: BriefRecordType<T> | null;
    changesMade: boolean;

    localFilePath: string[];

    tableList: Params<T>[];

    listeners: (...args: any[]) => any;
    resetActive: () => void;
    changeParams: (value: BriefRecordType<T>) => void;

    changesHappen: (happened: boolean) => void;
    createNew: () => void;
    edit: (key: string) => void;
    deleteRecord: (key: string) => void;
    save: () => void;
    saveAs: (name: string) => void;
    cancel: () => void;
}
