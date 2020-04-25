export interface DataSetEntry<T> {
    key: string;
    name: string;
    description: string;
    params: T;
    active: boolean;
    disabled?: boolean;
}

export interface RouterStore {
    path: string;
}

export interface WaterProps {
    pressure: number; // atm
    temperature: number; // ℃
    density: number | null; // g/cm^3
    viscosity: number | null; // todo unit of viscosity???
}

export interface WaterStore {
    props: DataSetEntry<WaterProps>[];
}

export interface RootStore {
    router: RouterStore;
    params: {
        water: WaterStore;
    };
    ui: {
        water: {
            props: {
                state: 'idle' | 'edit';
                activeKey: string;
            };
        };
    };
}

// todo
// const store: RootStore = {
// };
// export default store;
