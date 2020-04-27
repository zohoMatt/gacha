import { observable, action, computed } from 'mobx';
import { v4 } from 'uuid';
import { InputSwitcherType, DataSetEntry } from './types';

export interface WaterProps {
    pressure: number; // atm
    temperature: number; // ℃
    density: InputSwitcherType; // g/cm^3
    viscosity: InputSwitcherType; // g/cm.s
}

export interface WaterDatabase {
    props: DataSetEntry<WaterProps>[];
}

export type ActiveEditing = WaterProps & { name: string; description: string };

export class WaterStore {
    @observable database: WaterDatabase = { props: [] };

    @observable activeKey: string | null = null;

    @observable activeRecord: ActiveEditing | null = null;

    @observable changesMade = false;

    @computed get waterPropsList(): DataSetEntry<WaterProps>[] {
        return this.database.props;
    }

    constructor(params?: WaterDatabase) {
        this.database = params || { props: [] };
    }

    @action
    public resetActiveRecords() {
        this.activeRecord = null;
        this.activeKey = null;
        this.makeChanges(false);
    }

    @action
    public makeChanges(hasChanges = true) {
        this.changesMade = hasChanges;
    }

    @action
    public startNewRecord() {
        this.makeChanges(false);
        this.activeKey = v4();
        this.activeRecord = {
            name: '',
            description: '',
            pressure: 0,
            temperature: 0,
            density: { use: false, value: 0 },
            viscosity: { use: false, value: 0 }
        };
    }

    @action
    public editRecord(key: string) {
        this.makeChanges(false);
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
    public changeParam(key: string, value: any) {
        (this.activeRecord as any)[key] = value;
    }

    @action
    public changeAllParams(value: ActiveEditing) {
        this.activeRecord = value;
    }

    @action
    public deleteRecord(key: string) {
        if (key === this.activeKey) {
            this.activeKey = null;
            this.activeRecord = null;
        }
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
        this.resetActiveRecords();
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
        this.resetActiveRecords();
    }

    @action
    public cancel() {
        this.resetActiveRecords();
    }
}
