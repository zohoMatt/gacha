import * as React from 'react';
import { observer, Provider } from 'mobx-react';
import { EditWaterData } from './EditWaterData';
import { RecordList } from '../../common/RecordList';
import { waterRootStore } from '../../../store';

const styles = require('./WaterProps.module.less');

@observer
class WaterProps extends React.Component {
    public formRef: React.RefObject<any> = React.createRef();

    public toEdit = (key: string) => {
        waterRootStore.editRecord(key);
        // fixme current is null?
        if (waterRootStore.activeRecord && this.formRef.current) {
            this.formRef.current.setFieldsValue(waterRootStore.activeRecord);
        }
    };

    public render() {
        return (
            <div className={styles.container}>
                <div className={styles.title}>Water Properties</div>
                <Provider store={waterRootStore}>
                    <div className={styles.table}>
                        <RecordList
                            database={waterRootStore.database.props}
                            toEdit={this.toEdit}
                            toDelete={waterRootStore.deleteRecord.bind(waterRootStore)}
                            />
                    </div>
                    <div className={styles.edit}>
                        {waterRootStore.activeRecord ? <EditWaterData form={this.formRef} /> : null}
                    </div>
                </Provider>
            </div>
        );
    }
}

export default WaterProps;
