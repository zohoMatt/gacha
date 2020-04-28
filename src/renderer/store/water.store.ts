import { observable, action, computed } from 'mobx';
import { v4 } from 'uuid';

import { SwitcherType, DataSetEntry } from './types';

export interface WaterProps {
    pressure: number; // atm
    temperature: number; // ℃
    density: SwitcherType; // g/cm^3
    viscosity: SwitcherType; // g/cm.s
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
            pressure: 1.0,
            temperature: 25,
            density: { use: false },
            viscosity: { use: false }
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
    public changeAllParams(value: ActiveEditing) {
        this.activeRecord = value;
        this.makeChanges();
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
        if (!this.activeRecord || !this.activeRecord.name) {
            const error = `'Name' cannot be left empty.`;
            throw new Error(error);
        }
        const { name, description, pressure, temperature, density, viscosity } = this.activeRecord;
        const origin = this.database.props.find(p => p.key === this.activeKey);

        // New record
        if (!origin) {
            this.saveAs(name);
        } else {
            origin.name = name;
            origin.description = description;
            origin.params = {
                pressure,
                temperature,
                density,
                viscosity
            };
        }
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
            params: { temperature, density, pressure, viscosity }
        };
        this.database.props = [toAdd].concat(this.database.props);
        this.resetActiveRecords();
    }

    @action
    public cancel() {
        this.resetActiveRecords();
    }
}
