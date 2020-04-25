import { WaterStore } from '../../../src/renderer/store/water.store';

const MOCK_DATA = {
    props: [
        {
            key: 'a1',
            name: 'first experiment',
            description: '2019-02-12 by pp',
            params: {
                pressure: 1.001, // atm
                temperature: 25, // ℃
                density: 0.999, // g/cm^3
                viscosity: 0.0115
            },
            active: false,
            disabled: false
        },
        {
            key: 'a2',
            name: '2nd experiment',
            description: '2020-02-12 by pp',
            params: {
                pressure: 1.001, // atm
                temperature: 20, // ℃
                density: 0.999, // g/cm^3
                viscosity: 0.0115
            },
            active: false,
            disabled: false
        },
        {
            key: 'a3',
            name: '3rd experiment',
            description: '2020-02-21 by pp',
            params: {
                pressure: 1.001, // atm
                temperature: 30, // ℃
                density: 0.999, // g/cm^3
                viscosity: 0.0115
            },
            active: true,
            disabled: false
        }
    ]
};

let wstore: WaterStore | null = null;

beforeAll(() => {
    wstore = new WaterStore(MOCK_DATA);
});

describe(`Testing 'class WaterStore' in water.store.ts`, () => {
    test('@action save()', () => {
        if (!wstore) {
            expect(false);
            return;
        }
        wstore.editRecord('a1');
        wstore.save({
            description: 'no des',
            pressure: 12.001, // atm
            temperature: 125, // ℃
            density: 0.999, // g/cm^3
            viscosity: 0.0115
        });

        expect(wstore.params.props[0].params.temperature).toBe(125);
    });
});

afterAll(() => {
    wstore = null;
});
