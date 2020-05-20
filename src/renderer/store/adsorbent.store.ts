import { BasicTableWithEditStore, BriefRecordType, QuantityValue } from './base';
import { Store } from './init';

export interface AdsorbentParams {
    density: QuantityValue; // g/cm^3
    particleRadius: QuantityValue; // cm
    particlePorosity: QuantityValue; // no unit
    adsorbentType: string;
}

export class AdsorbentStore extends BasicTableWithEditStore<AdsorbentParams> {
    public STORE_NAME = 'AdsorbentStore';

    public DEFAULT_STORE: BriefRecordType<AdsorbentParams> = {
        name: '',
        description: '',
        manufacturer: '',
        density: {
            value: 0,
            unit: 'g/cm^3'
        }, // g/cm^3
        particleRadius: {
            value: 0,
            unit: 'cm'
        }, // cm
        particlePorosity: {
            value: 0,
            unit: ''
        }, // no unit
        adsorbentType: ''
    };

    constructor(rootStore: Store) {
        super(['database', 'adsorbent'], rootStore);
    }
}
