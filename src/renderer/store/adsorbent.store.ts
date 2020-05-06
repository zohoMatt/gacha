import { action } from 'mobx';
import { v4 } from 'uuid';
import { BasicTableWithEditStore, BriefRecordType } from './base';

export interface AdsorbentParams {
    density: number; // g/cm^3
    particleRadius: number; // cm
    particlePorosity: number; // no unit
    adsorbentType: string;
}

export class AdsorbentStore extends BasicTableWithEditStore<AdsorbentParams> {
    public STORE_NAME = 'AdsorbentStore';

    public DEFAULT_STORE: BriefRecordType<AdsorbentParams> = {
        name: '',
        description: '',
        manufacturer: '',
        density: 0, // g/cm^3
        particleRadius: 0, // cm
        particlePorosity: 0, // no unit
        adsorbentType: ''
    };

    constructor() {
        super(['database', 'adsorbent']);
    }
}
