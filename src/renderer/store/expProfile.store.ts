import { BasicTableWithEditStore, BriefRecordType, QuantityValue } from './base';
import { Store } from './init';
import { ExpProfileParams } from '../../utils/storage/expProfiles.types';

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
