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

describe(`Testing 'class WaterStore' in water.store.ts`, () => {
    test('@action save(), edit()', () => {
        const wstore = new WaterStore(MOCK_DATA);
        wstore.edit('a1');
        if (wstore.activeRecord) wstore.activeRecord.temperature = 125;
        wstore.save();

        expect(wstore.database.props[0].params.temperature).toBe(125);
    });

    test('@action createNew', () => {
        const wstore = new WaterStore({ props: [] });
        wstore.createNew();
        expect(wstore.activeRecord).toEqual({
            name: '',
            description: '',
            pressure: 0,
            temperature: 0,
            density: null,
            viscosity: null
        });
    });

    test('@action deleteRecord', () => {
        const wstore = new WaterStore(MOCK_DATA);
        wstore.deleteRecord('a1');
        expect(wstore.database.props.map(r => r.key)).toEqual(['a2', 'a3']);
    });

    test('@action edit() saveAs()', () => {
        const wstore = new WaterStore(MOCK_DATA);
        wstore.edit('a1');
        expect(wstore.activeKey).toBe('a1');
        expect(wstore.activeRecord).toEqual({
            name: 'first experiment',
            description: '2019-02-12 by pp',
            pressure: 1.001, // atm
            temperature: 25, // ℃
            density: 0.999, // g/cm^3
            viscosity: 0.0115
        });
        wstore.saveAs('PFOAA');
        expect(wstore.database.props.length).toBe(4);
    });

    test('Error information', () => {
        const wstore = new WaterStore(MOCK_DATA);
        // saveAs
        wstore.activeRecord = null;
        wstore.activeKey = null;
        expect(() => wstore.saveAs('random')).toThrowError();
        // save
        expect(() => wstore.save()).toThrowError();
        // edit
        expect(() => wstore.edit('noexist')).toThrowError();
    });
});
