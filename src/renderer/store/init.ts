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

    // readonly methods
    public static get adsorbents() {
        return Store.root.adsorbent.database.props;
    }

    public static get contaminants() {
        return Store.root.adsorbent.database.props;
    }

    public static get citedAdsorbentKeys() {
        return Store.root.exp.database.props.map((r: any) => r.bed.adsorbent);
    }

    public static get citedContaminants() {
        return Store.root.exp.database.props.map((r: any) => r.adsorption.contaminant);
    }
}
