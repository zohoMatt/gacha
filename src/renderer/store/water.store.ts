import { observable, action, computed, autorun, toJS } from 'mobx';
import { v4 } from 'uuid';

import {
    SwitcherType,
    TableWithEditStore,
    DataBaseType,
    FullRecordType,
    BriefRecordType
} from './types';
import { Storage } from '../../utils/localStore';

export interface WaterParams {
    pressure: number; // atm
    temperature: number; // ℃
    density: SwitcherType; // g/cm^3
    viscosity: SwitcherType; // g/cm.s
}

export class WaterStore implements TableWithEditStore<WaterParams> {
    @observable database: DataBaseType<WaterParams> = { props: [] };

    @observable activeKey: string | null = null;

    @observable activeRecord: BriefRecordType<WaterParams> | null = null;

    @observable changesMade = false;

    @computed get tableList(): FullRecordType<WaterParams>[] {
        return this.database.props;
    }

    public localFilePath: string[] = ['database', 'water'];

    public static STORED_PATH: string[] = ['database', 'water'];

    constructor() {
        this.database = Storage.read(WaterStore.STORED_PATH);
        autorun(async () => {
            return this.listeners();
        });
    }

    public async listeners() {
        try {
            await Storage.update(WaterStore.STORED_PATH, toJS(this.database));
            console.log(`WaterStore::autorun Storage updated successfully.`);
        } catch (e) {
            console.error(`WaterStore::autorun Storage failed in updating.`);
        }
    }

    @action
    public resetActive() {
        this.activeRecord = null;
        this.activeKey = null;
        this.changesHappen(false);
    }

    @action
    public changesHappen(hasChanges = true) {
        this.changesMade = hasChanges;
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
    public changeParams(value: BriefRecordType<WaterParams>) {
        this.activeRecord = value;
        this.changesHappen();
    }

    @action
    public deleteRecord(key: string) {
        if (key === this.activeKey) {
            this.resetActive();
        }
        this.database.props = this.tableList.filter(r => r.key !== key);
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

    @action
    public cancel() {
        this.resetActive();
    }
}
