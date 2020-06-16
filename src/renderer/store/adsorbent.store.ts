import { BasicTableWithEditStore, BriefRecordType } from './base';
import { Store } from './index';
import { AdsorbentParams } from '../../utils/storage/types';
import { AdsorbentDatabase } from '../app';

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
        super(rootStore, AdsorbentDatabase);
    }
}
