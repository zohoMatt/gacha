import { BasicTableWithEditStore, BriefRecordType, QuantityValue } from './base';
import { Store } from './init';

export interface WaterInputParams {
    pressure: QuantityValue; // atm
    temperature: QuantityValue; // ℃
    useDensity: boolean; // g/cm^3
    useViscosity: boolean; // g/cm.s
}

export interface PsdmInputParams {
    totalRunTime: QuantityValue; // d
    firstPointDisplayed: QuantityValue; // d
    timeStep: QuantityValue; // d
    numOfAxialElms: number;
    axialCollocatPts: number;
    radialCollocatPts: number;
}

export interface BedInputParams {
    adsorbent: string | null;
    length: QuantityValue; // cm
    diameter: QuantityValue; // cm
    mass: QuantityValue; // g
    flowrate: QuantityValue; // mL/min
    ebct: QuantityValue; // min
}

export interface CorrelationOrInput extends QuantityValue {
    correlation: boolean;
    // value is ignored when correlation === true
}

export interface AdsorptionInputParams {
    contaminant: string | null;
    initConcent: QuantityValue; // ug/L
    freundlich: {
        k: QuantityValue;
        nth: QuantityValue;
    };
    kinetics: {
        filmDiffusion: CorrelationOrInput; // cm/s,
        surfaceDiffusion: CorrelationOrInput; // cm^2/s
        poreDiffusion: CorrelationOrInput; // cm^2/s
        spdfr: QuantityValue;
        tortuosity: QuantityValue;
    };
}

export interface ExpProfileParams {
    water: WaterInputParams;
    psdm: PsdmInputParams;
    bed: BedInputParams;
    adsorption: AdsorptionInputParams;
}

export class ExpProfileStore extends BasicTableWithEditStore<ExpProfileParams> {
    public STORE_NAME = 'BedStore';

    public DEFAULT_STORE: BriefRecordType<ExpProfileParams> = {
        name: '',
        description: '',
        water: {
            pressure: { value: 1.01, unit: '' },
            temperature: { value: 25, unit: '' },
            useDensity: true,
            useViscosity: true
        },
        psdm: {
            totalRunTime: { value: 2, unit: 'd' },
            firstPointDisplayed: { value: 1e-3, unit: 'd' },
            timeStep: { value: 0.01, unit: 'd' },
            numOfAxialElms: 5,
            axialCollocatPts: 3,
            radialCollocatPts: 3
        },
        bed: {
            adsorbent: null,
            length: { value: 100, unit: 'cm' },
            diameter: { value: 20, unit: 'cm' },
            mass: { value: 800, unit: 'g' },
            flowrate: { value: 10, unit: 'mL/mins' },
            ebct: { value: 15, unit: 'mins' }
        },
        adsorption: {
            contaminant: null,
            initConcent: { value: 100, unit: 'ug/L' },
            freundlich: {
                k: { value: 100, unit: '' },
                nth: { value: 0.5, unit: '' }
            },
            kinetics: {
                filmDiffusion: {
                    correlation: true,
                    value: 0.1,
                    unit: 'cm/s'
                },
                surfaceDiffusion: {
                    correlation: true,
                    value: 0.1,
                    unit: 'cm^2/s'
                },
                poreDiffusion: {
                    correlation: true,
                    value: 0.1,
                    unit: 'cm^2/s'
                },
                spdfr: { value: 4, unit: '' },
                tortuosity: { value: 1, unit: '' }
            }
        }
    };

    constructor(rootStore: Store) {
        super(['experiment', 'profile'], rootStore);
    }
}
