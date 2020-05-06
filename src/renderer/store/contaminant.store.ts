import { v4 } from 'uuid';
import { BasicTableWithEditStore } from './types';

export interface ContaminantParams {
    contaminant: {
        molecularWeight: number; // mg/mmol
        molarVolume: number; // mL/gmol
        boilingPt: number; // ℃
        initConcent: number; // mg/L
        liquidDensity: number; // g/mL
        solubility: number; // mg/L
        vaporPressure: number; // Pa
        refractive: number;
        cas: number;
    };
    freundlich: {
        k: number;
        nth: number;
    };
    kinetics: {
        filmDiffusion: {
            correlation: boolean;
            value?: number; // cm/s, ignored when correlation === true
        };
        surfaceDiffusion: {
            correlation: boolean;
            value?: number; // cm^2/s
        };
        poreDiffusion: {
            correlation: boolean;
            value?: number; // cm^2/s
        };
        spdfr: number;
        tortuosity: number;
    };
}

export class ContaminantStore extends BasicTableWithEditStore<ContaminantParams> {
    public STORE_NAME = 'ContaminantParams';

    constructor() {
        super(['database', 'contaminant']);
    }

    public createNew(): void {
        this.changesHappen(false);
        this.activeKey = v4();
        this.activeRecord = {
            name: '',
            description: '',
            contaminant: {
                molecularWeight: 0, // mg/mmol
                molarVolume: 0, // mL/gmol
                boilingPt: 0, // ℃
                initConcent: 0, // mg/L
                liquidDensity: 0, // g/mL
                solubility: 0, // mg/L
                vaporPressure: 0, // Pa
                refractive: 0,
                cas: 0
            },
            freundlich: {
                k: 0,
                nth: 0
            },
            kinetics: {
                filmDiffusion: {
                    correlation: false,
                    value: 0
                },
                surfaceDiffusion: {
                    correlation: false,
                    value: 0
                },
                poreDiffusion: {
                    correlation: false,
                    value: 0
                },
                spdfr: 1,
                tortuosity: 0
            }
        };
    }
}
