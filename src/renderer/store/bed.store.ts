import { BasicTableWithEditStore, BriefRecordType } from './base';

export interface BedParams {
    length: number; // cm
    diameter: number; // cm
    mass: number; // g
    flowrate: number; // mL/min
    ebct: number; // min
}

export class BedStore extends BasicTableWithEditStore<BedParams> {
    public STORE_NAME = 'BedStore';

    public DEFAULT_STORE: BriefRecordType<BedParams> = {
        name: '',
        description: '',
        manufacturer: '',
        length: 0,
        diameter: 0,
        mass: 0,
        flowrate: 0,
        ebct: 0
    };

    constructor() {
        super(['database', 'bed']);
    }
}
