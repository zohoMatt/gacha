import * as React from 'react';
import { observer, Provider } from 'mobx-react';
import { EditWaterData } from './EditWaterData';
import { RecordList } from '../../common/RecordList';
import { DataSetEntry, WaterProps as IWaterProps } from '../../../store/initial';
import { WaterStore } from '../../../store/water.store';

const styles = require('./WaterProps.module.less');

const mockdata: DataSetEntry<IWaterProps>[] = [
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
];

const store = new WaterStore({ props: mockdata });

const WaterProps: React.FunctionComponent = observer(() => (
    <div className={styles.container}>
        <div className={styles.title}>Water Properties</div>
        <Provider store={store}>
            <div className={styles.table}>
                <RecordList
                    database={store.database.props}
                    toEdit={store.editRecord.bind(store)}
                    toDelete={store.deleteRecord.bind(store)}
                    />
            </div>
            <div className={styles.edit}>
                <EditWaterData {...store.activeRecord!} />
            </div>
        </Provider>
    </div>
));

export default WaterProps;
