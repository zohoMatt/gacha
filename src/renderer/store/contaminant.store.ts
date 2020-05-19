import { BasicTableWithEditStore, BriefRecordType, QuantityValue } from './base';
import { Store } from './init';

export interface ContaminantParams {
    fullName: string;
    molecularWeight: QuantityValue; // mg/mmol
    molarVolume: QuantityValue; // mL/gmol
    boilingPt: QuantityValue; // ℃
    liquidDensity: QuantityValue; // g/mL
    solubility: QuantityValue; // mg/L
    vaporPressure: QuantityValue; // Pa
    refractive: QuantityValue;
    cas: string;
}

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
            unit: 'mL/gmol'
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
        super(['database', 'contaminant'], rootStore);
    }
}
