import * as React from 'react';
import { observer, Provider } from 'mobx-react';
import { EditWaterData } from './EditWaterData';
import { RecordList } from '../../common/RecordList';
import { waterStore } from '../../../store';

const styles = require('./WaterProps.module.less');

const WaterProps: React.FunctionComponent = observer(() => (
    <div className={styles.container}>
        <div className={styles.title}>Water Properties</div>
        <Provider store={waterStore}>
            <div className={styles.table}>
                <RecordList
                    database={waterStore.database.props}
                    toEdit={waterStore.editRecord.bind(waterStore)}
                    toDelete={waterStore.deleteRecord.bind(waterStore)}
                    />
            </div>
            <div className={styles.edit}>
                {waterStore.activeRecord ? <EditWaterData {...waterStore.activeRecord} /> : null}
            </div>
        </Provider>
    </div>
));

export default WaterProps;
