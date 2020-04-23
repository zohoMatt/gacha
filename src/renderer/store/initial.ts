export interface RouterStore {
    path: string;
}

export interface RootStore {
    router: RouterStore;
    params: {
        water: [];
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
