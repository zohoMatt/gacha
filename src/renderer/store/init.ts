import { AdsorbentStore } from './adsorbent.store';
import { ContaminantStore } from './contaminant.store';
import { ExperimentStore } from './experiment.store';

export interface StoreInjectedProp {
    store?: Store;
}

export class Store {
    public adsorbent: AdsorbentStore;

    public contaminant: ContaminantStore;

    public exp: ExperimentStore;

    public constructor() {
        this.adsorbent = new AdsorbentStore(this);
        this.contaminant = new ContaminantStore(this);
        this.exp = new ExperimentStore(this);
    }
}
