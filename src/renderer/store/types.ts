export interface DataSetEntry<T> {
    key: string;
    name: string;
    description: string;
    params: T;
    active: boolean;
    disabled?: boolean;
}

export interface InputSwitcherType {
    use: boolean;
    value: number;
}
