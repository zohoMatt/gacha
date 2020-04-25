import { observable, action, computed } from 'mobx';
import { DataSetEntry } from './initial';

export interface WaterProps {
    pressure: number; // atm
    temperature: number; // ℃
    density: number | null; // g/cm^3
    viscosity: number | null; // todo unit of viscosity???
}

export interface WaterDatabase {
    props: DataSetEntry<WaterProps>[];
}

export class WaterStore {
    @observable params: WaterDatabase = { props: [] };

    @observable activeKey: string | null = null;

    @computed get waterPropsList(): DataSetEntry<WaterProps>[] {
        return this.params.props;
    }

    constructor(params?: WaterDatabase) {
        this.params = params || { props: [] };
    }

    @action
    public editRecord(key: string) {
        this.activeKey = key;
    }

    @action
    public deleteRecord(key: string) {
        this.params.props = this.waterPropsList.filter(r => r.key !== key);
    }

    @action
    public save(params: WaterProps & { description: string }) {
        const origin = this.params.props.find(p => p.key === this.activeKey);
        if (!origin) {
            console.warn(`'activeKey' has no valid corresponding record.`);
            return;
        }
        const copy = { ...params };
        origin.description = copy.description;
        delete copy.description;
        origin.params = copy;
        // reset status
        this.activeKey = null;
    }

    // @action
    // public saveAs(name: string) {
    //     // todo;
    // }
}
