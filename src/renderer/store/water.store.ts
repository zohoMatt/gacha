import { action } from 'mobx';
import { v4 } from 'uuid';

import { SwitcherType, BasicTableWithEditStore } from './types';

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
}
