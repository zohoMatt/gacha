import { SwitcherType, BasicTableWithEditStore, BriefRecordType } from './base';

// todo Use quantity value
export interface WaterQuantityValue {
    pressure: {
        value: number;
        unit: string;
    };
    temperature: {
        value: number;
        unit: string;
    };
    density: {
        use: boolean;
        unit: string;
    };
    viscosity: {
        use: boolean;
        unit: string;
    };
}

export interface WaterParams {
    pressure: number; // atm
    temperature: number; // ℃
    density: SwitcherType; // g/cm^3
    viscosity: SwitcherType; // g/cm.s
}

export class WaterStore extends BasicTableWithEditStore<WaterParams> {
    public STORE_NAME = 'WaterStore';

    public DEFAULT_STORE: BriefRecordType<WaterParams> = {
        name: '',
        description: '',
        pressure: 1.0,
        temperature: 25,
        density: { use: false },
        viscosity: { use: false }
    };

    constructor() {
        super(['database', 'water']);
    }
}
