import { ContaminantDatabase } from '../app';
import { BasicTableWithEditStore, BriefRecordType } from './base';
import { Store } from './init';
import { ContaminantParams } from '../../utils/storage/types';

export class ContaminantStore extends BasicTableWithEditStore<ContaminantParams> {
    public STORE_NAME = 'ContaminantParams';

    public DEFAULT_STORE: BriefRecordType<ContaminantParams> = {
        name: '',
        description: '',
        fullName: '',
        molecularWeight: {
            value: 0,
            unit: 'mg/mmol'
        },
        molarVolume: {
            value: 0,
            unit: 'mL/mol'
        },
        boilingPt: {
            value: 0,
            unit: 'degC'
        },
        liquidDensity: {
            value: 0,
            unit: 'g/mL'
        },
        solubility: {
            value: 0,
            unit: 'mg/L'
        },
        vaporPressure: {
            value: 0,
            unit: 'Pa'
        },
        refractive: {
            value: 0,
            unit: ''
        },
        cas: ''
    };

    constructor(rootStore: Store) {
        super(rootStore, ContaminantDatabase);
    }
}
