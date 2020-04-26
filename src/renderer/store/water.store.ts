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

type ActiveEditing = (WaterProps & { name: string; description: string }) | null;

export class WaterStore {
    @observable database: WaterDatabase = { props: [] };

    @observable activeKey: string | null = null;

    @observable activeRecord: ActiveEditing | null = null;

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
    public editRecord(key: string) {
        this.activeKey = key;
        const entry = this.database.props.find(r => r.key === key);
        if (!entry) {
            throw new Error(`'editRecord()' No matching record.`);
        }
        const { name, description } = entry;
        const { temperature, viscosity, pressure, density } = entry.params;
        this.activeRecord = { name, description, temperature, viscosity, pressure, density };
    }

    @action
    public changeParam(key: string, value: string | number) {
        (this.activeRecord as any)[key] = value;
    }

    @action
    public deleteRecord(key: string) {
        console.log(key);
        this.database.props = this.waterPropsList.filter(r => r.key !== key);
    }

    @action
    public save() {
        const origin = this.database.props.find(p => p.key === this.activeKey);
        if (!origin) {
            throw new Error(`'activeKey' has no valid corresponding record.`);
        }
        const copy: any = { ...this.activeRecord };
        origin.description = copy.description;
        delete copy.description;
        origin.params = copy;
        // reset status
        this.activeKey = null;
    }

    @action
    public saveAs(name: string) {
        const key = v4();
        if (!this.activeRecord) {
            throw new Error(`saveAs(): No valid active record editing.`);
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
    }
}
