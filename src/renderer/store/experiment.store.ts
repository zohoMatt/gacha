import { BasicTableWithEditStore, BriefRecordType } from './base';

export interface WaterInputParams {
    pressure: number; // atm
    temperature: number; // ℃
    useDensity: boolean; // g/cm^3
    useViscosity: boolean; // g/cm.s
}

export interface PsdmInputParams {
    totalRunTime: number; // d
    firstPointDisplayed: number; // d
    timeStep: number; // d
    numOfAxialElms: number;
    axialCollocatPts: number;
    radialCollocatPts: number;
}

export interface BedInputParams {
    length: number; // cm
    diameter: number; // cm
    mass: number; // g
    flowrate: number; // mL/min
    ebct: number; // min
}

export interface CorrelationOrInput {
    correlation: boolean;
    value?: number; // ignored when correlation === true
}

export interface AdsorptionInputParams {
    freundlich: {
        k: number;
        nth: number;
    };
    kinetics: {
        filmDiffusion: CorrelationOrInput; // cm/s,
        surfaceDiffusion: CorrelationOrInput; // cm^2/s
        poreDiffusion: CorrelationOrInput; // cm^2/s
        spdfr: number;
        tortuosity: number;
    };
}

export interface ExpProfileParams {
    water: WaterInputParams;
    psdm: PsdmInputParams;
    bed: BedInputParams;
    adsorption: AdsorptionInputParams;
}

export class ExperimentStore extends BasicTableWithEditStore<ExpProfileParams> {
    public STORE_NAME = 'BedStore';

    public DEFAULT_STORE: BriefRecordType<ExpProfileParams> = {
        name: '',
        description: '',
        water: {
            pressure: 1.01,
            temperature: 25,
            useDensity: true,
            useViscosity: true
        },
        psdm: {
            totalRunTime: 2, // d
            firstPointDisplayed: 1e-3, // d
            timeStep: 0.01, // d
            numOfAxialElms: 5,
            axialCollocatPts: 3,
            radialCollocatPts: 3
        },
        bed: {
            length: 100, // cm
            diameter: 20, // cm
            mass: 800, // g
            flowrate: 10, // mL/min
            ebct: 15 // min
        },
        adsorption: {
            freundlich: {
                k: 100,
                nth: 0.5
            },
            kinetics: {
                filmDiffusion: {
                    correlation: false,
                    value: 0.1
                }, // cm/s,
                surfaceDiffusion: {
                    correlation: false,
                    value: 0.1
                }, // cm^2/s
                poreDiffusion: {
                    correlation: false,
                    value: 0.1
                }, // cm^2/s
                spdfr: 4,
                tortuosity: 1
            }
        }
    };

    constructor() {
        super(['experiment', 'profile']);
    }
}
