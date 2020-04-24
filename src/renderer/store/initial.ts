export interface DataSetEntry<T> {
    key: string;
    name: string;
    description: string;
    params: T;
    active: boolean;
    disabled?: boolean;
}

export interface WaterProps {
    pressure: number; // atm
    temperature: number; // ℃
    density: number | null; // g/cm^3
    viscosity: number | null; // todo unit of viscosity???
}

export interface RouterStore {
    path: string;
}

export interface RootStore {
    router: RouterStore;
    params: {
        water: DataSetEntry<WaterProps>[];
        components: [];
        simulation: [];
        fixedBed: {
            adsorber: [];
            bed: [];
        };
        adsorbent: {
            database: [];
            solution: [];
        };
    };
}

// todo
// const store: RootStore = {
// };
// export default store;
