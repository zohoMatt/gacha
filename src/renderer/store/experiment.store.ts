import { BasicTableWithEditStore, BriefRecordType } from './base';

export interface ExpProfileParams {
    test: number;
}

export class ExperimentStore extends BasicTableWithEditStore<ExpProfileParams> {
    public STORE_NAME = 'BedStore';

    public DEFAULT_STORE: BriefRecordType<ExpProfileParams> = {
        name: '',
        description: '',
        test: 0
    };

    constructor() {
        super(['experiment', 'profile']);
    }
}
