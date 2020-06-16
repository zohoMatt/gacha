import { AdsorbentStore } from './adsorbent.store';
import { ContaminantStore } from './contaminant.store';
import { ExpProfileStore } from './expProfile.store';

export interface StoreInjectedProp {
    store?: Store;
}

export class Store {
    public adsorbent: AdsorbentStore;

    public contaminant: ContaminantStore;

    public exp: ExpProfileStore;

    public constructor() {
        this.adsorbent = new AdsorbentStore(this);
        this.contaminant = new ContaminantStore(this);
        this.exp = new ExpProfileStore(this);
    }
}
