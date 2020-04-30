import * as React from 'react';
import { observer, Provider } from 'mobx-react';
import { message } from 'antd';
import { EditWaterData } from './EditWaterData';
import { RecordList } from '../../common/RecordList';
import { ActiveEditing, WaterStore } from '../../../store/water.store';
import { OperationPanel, OperationPanelButtons } from '../../common/OperationPanel';
import { IdleStatePrompt } from '../../common/IdleStatePrompt';
import { ViewWaterProps } from './ViewWaterProps';
import { WaterPopertiesValidators } from '../../../../utils/validators/waterProperties.valid';
import { triggerValidator } from '../../../../utils/validators/trigger';
import { ValidLevels } from '../../../../utils/validators/types';

const styles = require('./WaterProps.module.less');

export interface WaterComponentState {
    warning: boolean;
    status: 'idle' | 'edit' | 'view';
}

@observer
class WaterProps extends React.Component<{}, WaterComponentState> {
    public state: WaterComponentState = {
        warning: false,
        status: 'idle'
    };

    public store = new WaterStore();

    public formRef: React.RefObject<any> = React.createRef();

    public createNew = () => {
        this.store.startNewRecord();
        this.setState({ status: 'edit' });
    };

    public toView = (key: string) => {
        this.store.editRecord(key);
        this.setState({ status: 'view' });
    };

    public toDelete = (key: string) => {
        // if deleting current
        if (key === this.store.activeKey) {
            this.setState({ status: 'idle' });
        }

        this.store.deleteRecord(key);
        message.info('Successfully deleted');
    };

    public save = (name?: string) => {
        // Validate
        if (!this.validate(this.store.activeRecord, name)) return;

        if (name === undefined) {
            this.store.save();
            this.setState({ status: 'view' });
        } else {
            this.store.saveAs(name);
            this.setState({ status: 'view' });
        }
        message.info('Successfully saved');
    };

    public triggerStatusChange = (confirm = false) => {
        if (confirm) {
            this.setState({ status: 'idle' });
            this.store.resetActiveRecords();

            this.setState({ warning: false });
        } else if (this.store.changesMade) {
            this.setState({ warning: true });
        } else {
            this.setState({ status: 'idle' });
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

    public changeParams = (allParams: ActiveEditing) => {
        this.store.changeAllParams(allParams);
    };

    protected validate(record: any, newName?: string) {
        const allNames = this.store.database.props
            .filter(r => newName || r.key !== this.store.activeKey)
            .map(p => p.name);
        for (const key in WaterPopertiesValidators) {
            if (
                !triggerValidator(
                    key === 'name'
                        ? WaterPopertiesValidators[key](
                              newName === undefined ? record[key] : newName,
                              allNames
                          )
                        : WaterPopertiesValidators[key](record[key]),
                    ValidLevels.Error
                )
            )
                return false;
        }
        return true;
    }

    public render() {
        const { warning, status } = this.state;
        const { changesMade, activeRecord, waterPropsList } = this.store;
        const { Edit, Save, SaveAs, Cancel } = OperationPanelButtons;
        return (
            <div className={styles.container}>
                <div className={styles.title}>Water Properties</div>
                <Provider store={this.store}>
                    <div className={styles.table}>
                        <RecordList
                            database={waterPropsList}
                            disabled={status === 'edit'}
                            toView={this.toView}
                            toDelete={this.toDelete}
                            />
                    </div>
                    <div className={styles.edit}>
                        {status === 'idle' ? <IdleStatePrompt onCreate={this.createNew} /> : null}
                        {status === 'view' ? <ViewWaterProps data={activeRecord!} /> : null}
                        {status === 'edit' ? (
                            <EditWaterData
                                form={this.formRef}
                                initValues={activeRecord!}
                                onValuesChange={this.changeParams}
                                />
                        ) : null}
                        {status !== 'idle' ? (
                            <OperationPanel
                                buttons={
                                    status === 'view'
                                        ? [Edit, SaveAs, Cancel]
                                        : [Save, SaveAs, Cancel]
                                }
                                saveDisabled={!changesMade || !this.isValid(true)}
                                saveAsDisabled={!this.isValid(false)}
                                warning={warning}
                                onEdit={() => this.setState({ status: 'edit' })}
                                onSave={() => this.save()}
                                onSavedAs={(newName: string) => this.save(newName)}
                                onTriggerCancel={() => this.triggerStatusChange()}
                                onQuitCancel={() => this.setState({ warning: false })}
                                onConfirmCancel={() => this.triggerStatusChange(true)}
                                />
                        ) : null}
                    </div>
                </Provider>
            </div>
        );
    }
}

export default WaterProps;
