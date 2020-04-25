import { observable, action, computed } from 'mobx';
import { v4 } from 'uuid';
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

type ActiveEditing = (WaterProps & { name?: string; description: string }) | null;

export class WaterStore {
    @observable database: WaterDatabase = { props: [] };

    @observable activeKey: string | null = null;

    @observable activeRecord: ActiveEditing = null;

    @computed get waterPropsList(): DataSetEntry<WaterProps>[] {
        return this.database.props;
    }

    constructor(params?: WaterDatabase) {
        this.database = params || { props: [] };
    }

    @action
    public startNewRecord() {
        this.activeKey = v4();
        this.activeRecord = {
            name: '',
            description: '',
            pressure: 0,
            temperature: 0,
            density: null,
            viscosity: null
        };
    }

    @action
    public editRecord(key: string): 0 | 1 {
        this.activeKey = key;
        const entry = this.database.props.find(r => r.key === key);
        if (!entry) {
            console.warn(`'editRecord()' No matching record.`);
            return 0;
        }
        const { name, description } = entry;
        const { temperature, viscosity, pressure, density } = entry.params;
        this.activeRecord = { name, description, temperature, viscosity, pressure, density };
        return 1;
    }

    @action
    public deleteRecord(key: string) {
        this.database.props = this.waterPropsList.filter(r => r.key !== key);
    }

    @action
    public save(): 0 | 1 {
        const origin = this.database.props.find(p => p.key === this.activeKey);
        if (!origin) {
            console.warn(`'activeKey' has no valid corresponding record.`);
            return 0;
        }
        const copy: any = { ...this.activeRecord };
        origin.description = copy.description;
        delete copy.description;
        origin.params = copy;
        // reset status
        this.activeKey = null;
        return 1;
    }

    @action
    public saveAs(name: string): 0 | 1 {
        const key = v4();
        if (!this.activeRecord) {
            console.warn(`saveAs(): No valid active record editing.`);
            return 0;
        }
        const { description, temperature, density, pressure, viscosity } = this.activeRecord;
        const toAdd = {
            key,
            name,
            description,
            params: { temperature, density, pressure, viscosity },
            disabled: false,
            active: false
        };
        this.database.props.push(toAdd);
        return 1;
    }
}
