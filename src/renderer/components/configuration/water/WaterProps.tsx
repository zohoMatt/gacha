import * as React from 'react';
import { observer, Provider } from 'mobx-react';
import { EditWaterData } from './EditWaterData';
import { RecordList } from '../../common/RecordList';
import { waterRootStore } from '../../../store';

const styles = require('./WaterProps.module.less');

const WaterProps: React.FunctionComponent = observer(() => (
    <div className={styles.container}>
        <div className={styles.title}>Water Properties</div>
        <Provider store={waterRootStore}>
            <div className={styles.table}>
                <RecordList
                    database={waterRootStore.database.props}
                    toEdit={waterRootStore.editRecord.bind(waterRootStore)}
                    toDelete={waterRootStore.deleteRecord.bind(waterRootStore)}
                    />
            </div>
            <div className={styles.edit}>
                {waterRootStore.activeRecord ? <EditWaterData /> : null}
            </div>
        </Provider>
    </div>
));

export default WaterProps;
