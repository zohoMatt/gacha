import { BasicTableWithEditStore, BriefRecordType } from './base';
import { Store } from './init';

export interface ContaminantParams {
    fullName: string;
    molecularWeight: number; // mg/mmol
    molarVolume: number; // mL/gmol
    boilingPt: number; // ℃
    initConcent: number; // mg/L
    liquidDensity: number; // g/mL
    solubility: number; // mg/L
    vaporPressure: number; // Pa
    refractive: number;
    cas: number;
}

export class ContaminantStore extends BasicTableWithEditStore<ContaminantParams> {
    public STORE_NAME = 'ContaminantParams';

    public DEFAULT_STORE: BriefRecordType<ContaminantParams> = {
        name: '',
        description: '',
        fullName: '',
        molecularWeight: 0, // mg/mmol
        molarVolume: 0, // mL/gmol
        boilingPt: 0, // ℃
        initConcent: 0, // mg/L
        liquidDensity: 0, // g/mL
        solubility: 0, // mg/L
        vaporPressure: 0, // Pa
        refractive: 0,
        cas: 0
    };

    constructor(rootStore: Store) {
        super(['database', 'contaminant'], rootStore);
    }
}
