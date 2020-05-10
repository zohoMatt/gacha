import { AdsorbentStore } from './adsorbent.store';
import { ContaminantStore } from './contaminant.store';
import { ExperimentStore } from './experiment.store';

export class Store {
    public static root: any;

    public static init() {
        Store.root = {
            adsorbent: new AdsorbentStore(),
            contaminant: new ContaminantStore(),
            exp: new ExperimentStore()
        };
    }
}
