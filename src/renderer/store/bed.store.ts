import { action } from 'mobx';
import { v4 } from 'uuid';
import { BasicTableWithEditStore } from './types';

export interface BedParams {
    length: number; // cm
    diameter: number; // cm
    mass: number; // g
    flowrate: number; // mL/min
    ebct: number; // min
}

export class BedStore extends BasicTableWithEditStore<BedParams> {
    public STORE_NAME = 'BedStore';

    constructor() {
        super(['database', 'bed']);
    }

    @action
    public createNew() {
        this.changesHappen(false);
        this.activeKey = v4();
        this.activeRecord = {
            name: '',
            description: '',
            length: 0,
            diameter: 0,
            mass: 0,
            flowrate: 0,
            ebct: 0
        };
    }
}
