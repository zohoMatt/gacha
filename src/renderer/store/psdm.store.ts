import { action } from 'mobx';
import { v4 } from 'uuid';

import { BasicTableWithEditStore, BriefRecordType } from './base';

export interface PsdmParams {
    totalRunTime: number; // d
    firstPointDisplayed: number; // d
    timeStep: number; // d
    numOfAxialElms: number;
    axialCollocatPts: number;
    radialCollocatPts: number;
}

export class PsdmStore extends BasicTableWithEditStore<PsdmParams> {
    public STORE_NAME = 'PSDMStore';

    public DEFAULT_STORE: BriefRecordType<PsdmParams> = {
        name: '',
        description: '',
        totalRunTime: 2.0,
        firstPointDisplayed: 1e-8,
        timeStep: 0.05,
        numOfAxialElms: 1,
        axialCollocatPts: 1,
        radialCollocatPts: 1
    };

    constructor() {
        super(['database', 'simParams', 'psdm']);
    }
}
