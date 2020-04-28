import * as React from 'react';
import { observer, Provider } from 'mobx-react';
import { message } from 'antd';
import { EditWaterData } from './EditWaterData';
import { RecordList } from '../../common/RecordList';
import { waterRootStore } from '../../../store';
import { OperationPanel } from '../../common/OperationPanel';
import { IdleStatePrompt } from '../../common/IdleStatePrompt';

const styles = require('./WaterProps.module.less');

export interface WaterComponentState {
    warning: boolean;
    status: 'idle' | 'edit';
}

@observer
class WaterProps extends React.Component {
    public state: WaterComponentState = {
        status: 'idle',
        warning: false
    };

    public pendingKey = '';

    public formRef: React.RefObject<any> = React.createRef();

    public componentDidMount() {
        if (waterRootStore.activeRecord && this.state.status === 'idle') {
            this.setState({ status: 'edit' });
        }
    }

    public createNew = () => {
        this.setState({ status: 'edit' });
        waterRootStore.startNewRecord();
    };

    public toEdit = (key: string, force?: boolean) => {
        if (key === '') return;
        if (key === waterRootStore.activeKey) {
            message.warning(`Already editing '${waterRootStore.activeRecord!.name}'`);
            return;
        }

        if (!waterRootStore.changesMade || force) {
            waterRootStore.editRecord(key);
            this.pendingKey = '';
            this.setState({ status: 'edit' });
            if (this.formRef.current)
                this.formRef.current.setFieldsValue(waterRootStore.activeRecord);
        } else {
            this.setState({ warning: true });
            this.pendingKey = key;
        }
    };

    public toDelete = (key: string) => {
        if (key === waterRootStore.activeKey) {
            this.setState({ status: 'idle' });
        }
        waterRootStore.deleteRecord(key);
        message.info('Successfully deleted');
    };

    public save = (name?: string) => {
        if (name === undefined) {
            waterRootStore.save();
            this.setState({ status: 'idle' });
        } else {
            waterRootStore.saveAs(name);
            this.setState({ status: 'idle' });
        }
        message.info('Successfully saved');
    };

    public triggerStatusChange = (confirm = false) => {
        if (confirm) {
            if (this.pendingKey) {
                this.toEdit(this.pendingKey, true);
                this.setState({ warning: false });
            } else {
                this.setState({ warning: false, status: 'idle' });
                waterRootStore.resetActiveRecords();
            }
        } else if (waterRootStore.changesMade) {
            this.setState({ warning: true });
        } else {
            this.setState({ status: 'idle' });
        }
    };

    public isValid = (checkName: boolean) => {
        const record = waterRootStore.activeRecord;
        return (
            record &&
            (record.name || !checkName) &&
            record.description &&
            record.temperature &&
            record.pressure
        );
    };

    public render() {
        const { warning, status } = this.state;
        const { database, changesMade } = waterRootStore;
        return (
            <div className={styles.container}>
                <div className={styles.title}>Water Properties</div>
                <Provider store={waterRootStore}>
                    <div className={styles.table}>
                        <RecordList
                            database={database.props}
                            toEdit={this.toEdit}
                            toDelete={this.toDelete}
                            />
                    </div>
                    <div className={styles.edit}>
                        {status === 'edit' ? <EditWaterData form={this.formRef} /> : null}
                        {status === 'edit' ? (
                            <OperationPanel
                                saveDisabled={!changesMade || !this.isValid(true)}
                                saveAsDisabled={!this.isValid(false)}
                                warning={warning}
                                onSave={() => this.save()}
                                onSavedAs={(newName: string) => this.save(newName)}
                                onTriggerCancel={() => this.triggerStatusChange()}
                                onQuitCancel={() => this.setState({ warning: false })}
                                onConfirmCancel={() => this.triggerStatusChange(true)}
                                />
                        ) : (
                            <IdleStatePrompt onCreate={this.createNew} />
                        )}
                    </div>
                </Provider>
            </div>
        );
    }
}

export default WaterProps;
