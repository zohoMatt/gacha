import { observable, action, computed, autorun, toJS } from 'mobx';
import { v4 } from 'uuid';

import { SwitcherType, DataBaseType, FullRecordType, BasicTableWithEditStore } from './types';
import { Storage } from '../../utils/localStore';

export interface WaterParams {
    pressure: number; // atm
    temperature: number; // ℃
    density: SwitcherType; // g/cm^3
    viscosity: SwitcherType; // g/cm.s
}

export class WaterStore extends BasicTableWithEditStore<WaterParams> {
    public STORE_NAME = 'WaterStore';

    constructor() {
        super(['database', 'water']);
    }

    @action
    public createNew() {
        this.changesHappen(false);
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
    public edit(key: string) {
        this.changesHappen(false);
        this.activeKey = key;
        const entry = this.tableList.find(r => r.key === key);
        if (!entry) {
            throw new Error(`'editRecord()' No matching record.`);
        }
        const { name, description } = entry;
        const { temperature, viscosity, pressure, density } = entry.params;
        this.activeRecord = { name, description, temperature, viscosity, pressure, density };
    }

    @action
    public save() {
        if (!this.activeRecord || !this.activeRecord.name) {
            const error = `'Name' cannot be left empty.`;
            throw new Error(error);
        }
        const { name, description, pressure, temperature, density, viscosity } = this.activeRecord;
        const origin = this.tableList.find(p => p.key === this.activeKey);

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

        this.changesHappen(false);
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
        this.database.props = [toAdd].concat(this.tableList);
        // Active new key
        this.edit(key);
    }
}
