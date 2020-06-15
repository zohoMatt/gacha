import { autorun, observable } from 'mobx';
import { ExpProfilesStorage } from '../app';
import { BasicTableWithEditStore, BriefRecordType } from './base';
import { Store } from './init';
import { ExpProfileParams } from '../../utils/storage/types';
import { ProfileMaths } from '../../mods/calculation/profile.maths';
import { profileToInput } from './helpers';

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
            flowrate: { value: 10, unit: 'mL/mins' }
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
                    unit: 'cm/mins'
                },
                surfaceDiffusion: {
                    correlation: true,
                    value: 0.1,
                    unit: 'cm^2/mins'
                },
                poreDiffusion: {
                    correlation: true,
                    value: 0.1,
                    unit: 'cm^2/mins'
                },
                spdfr: { value: 4, unit: '' },
                tortuosity: { value: 1, unit: '' }
            }
        }
    };

    @observable public calculation: ProfileMaths | null = null;

    constructor(rootStore: Store) {
        super(rootStore, ExpProfilesStorage);
        // Update calculations when active record is changing
        autorun(async () => {
            await this.onEdit();
        });
    }

    public async onEdit() {
        if (!this.activeRecord) {
            this.calculation = null;
            return;
        }

        const { bed, adsorption } = this.activeRecord;
        const { adsorbent: adsorbentKey } = bed;
        const { contaminant: contaminantKey } = adsorption;

        // Validate first
        if (!contaminantKey || !adsorbentKey) {
            this.calculation = null;
            return;
        }

        const adsorbent = await this.root.adsorbent.queryWithKeyInList(adsorbentKey);
        const contaminant = await this.root.contaminant.queryWithKeyInList(contaminantKey);
        const inputParams = profileToInput(this.activeRecord, adsorbent, contaminant);

        // Validate again
        if (!inputParams) {
            this.calculation = null;
            return;
        }

        this.calculation = new ProfileMaths(inputParams);
    }
}
