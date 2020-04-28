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
}

@observer
class WaterProps extends React.Component<{}, WaterComponentState> {
    public state: WaterComponentState = {
        warning: false
    };

    public pendingKey = '';

    public formRef: React.RefObject<any> = React.createRef();

    public createNew = () => {
        waterRootStore.startNewRecord();
    };

    public toEdit = (key: string, force?: boolean) => {
        if (key === '') return; // Called after confirming quitting, but no pending key exists

        // Repeatedly press 'edit' button
        if (key === waterRootStore.activeKey) {
            message.warning(`Already editing '${waterRootStore.activeRecord!.name}'`);
            return;
        }

        // Called after confirming quitting, certain pending key exists
        // OR: No changes has been made to this record.
        if (!waterRootStore.changesMade || force) {
            waterRootStore.editRecord(key);
            this.pendingKey = '';
            if (this.formRef.current)
                this.formRef.current.setFieldsValue(waterRootStore.activeRecord);
        } else {
            this.setState({ warning: true });
            this.pendingKey = key;
        }
    };

    public toDelete = (key: string) => {
        waterRootStore.deleteRecord(key);
        message.info('Successfully deleted');
    };

    public save = (name?: string) => {
        if (name === undefined) {
            waterRootStore.save();
        } else {
            waterRootStore.saveAs(name);
        }
        message.info('Successfully saved');
    };

    public triggerStatusChange = (confirm = false) => {
        if (confirm) {
            waterRootStore.resetActiveRecords();
            // If the confirmation popover is triggered by 'edit' button
            this.toEdit(this.pendingKey, true);

            this.setState({ warning: false });
        } else if (waterRootStore.changesMade) {
            this.setState({ warning: true });
        } else {
            waterRootStore.resetActiveRecords();
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
        const { warning } = this.state;
        const { changesMade, activeRecord, waterPropsList } = waterRootStore;
        return (
            <div className={styles.container}>
                <div className={styles.title}>Water Properties</div>
                <Provider store={waterRootStore}>
                    <div className={styles.table}>
                        <RecordList
                            database={waterPropsList}
                            toEdit={this.toEdit}
                            toDelete={this.toDelete}
                            />
                    </div>
                    <div className={styles.edit}>
                        {activeRecord ? <EditWaterData form={this.formRef} /> : null}
                        {activeRecord ? (
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
