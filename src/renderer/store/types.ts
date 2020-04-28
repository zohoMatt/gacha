export interface DataSetEntry<T> {
    key: string;
    name: string;
    description: string;
    params: T;
}

export interface InputSwitcherType {
    use: boolean;
    value: number;
}

export interface SwitcherType {
    use: boolean;
}
