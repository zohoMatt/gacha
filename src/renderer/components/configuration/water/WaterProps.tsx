import * as React from 'react';
import { observer, Provider } from 'mobx-react';
import { message } from 'antd';
import { EditWaterData } from './EditWaterData';
import { RecordList } from '../../common/RecordList';
import { WaterStore } from '../../../store/water.store';
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

    public store = new WaterStore();

    public pendingKey = '';

    public formRef: React.RefObject<any> = React.createRef();

    public createNew = () => {
        this.store.startNewRecord();
    };

    public toEdit = (key: string, force?: boolean) => {
        if (key === '') return; // Called after confirming quitting, but no pending key exists

        // Repeatedly press 'edit' button
        if (key === this.store.activeKey) {
            message.warning(`Already editing '${this.store.activeRecord!.name}'`);
            return;
        }

        // Called after confirming quitting, certain pending key exists
        // OR: No changes has been made to this record.
        if (!this.store.changesMade || force) {
            this.store.editRecord(key);
            this.pendingKey = '';
            if (this.formRef.current) this.formRef.current.setFieldsValue(this.store.activeRecord);
        } else {
            this.setState({ warning: true });
            this.pendingKey = key;
        }
    };

    public toDelete = (key: string) => {
        this.store.deleteRecord(key);
        message.info('Successfully deleted');
    };

    public save = (name?: string) => {
        if (name === undefined) {
            this.store.save();
        } else {
            this.store.saveAs(name);
        }
        message.info('Successfully saved');
    };

    public triggerStatusChange = (confirm = false) => {
        if (confirm) {
            this.store.resetActiveRecords();
            // If the confirmation popover is triggered by 'edit' button
            this.toEdit(this.pendingKey, true);

            this.setState({ warning: false });
        } else if (this.store.changesMade) {
            this.setState({ warning: true });
        } else {
            this.store.resetActiveRecords();
        }
    };

    public isValid = (checkName: boolean) => {
        const record = this.store.activeRecord;
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
        const { changesMade, activeRecord, waterPropsList } = this.store;
        return (
            <div className={styles.container}>
                <div className={styles.title}>Water Properties</div>
                <Provider store={this.store}>
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
