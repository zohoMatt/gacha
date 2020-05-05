import { observer } from 'mobx-react';
import * as React from 'react';
import { message } from 'antd';

import { OperationPanel, OperationPanelButtons } from '../common/OperationPanel';
import { RecordList } from '../common/RecordList';
import { IdleStatePrompt } from '../common/IdleStatePrompt';
import { Automation } from '../../../mods/validators/common';

import { Validator, ValidLevels } from '../../../mods/validators/types';
import { BriefRecordType, BasicTableWithEditStore } from '../../store/types';
import { WaterParams } from '../../store/water.store';

const styles = require('./TableWithEditSection.module.less');

export interface RenderPropsParams {
    form: React.RefObject<any>;
    initValues: BriefRecordType<any>;
    onValuesChange: (...args: any[]) => any;
}

// Render props component
export interface EditProps {
    form: React.RefObject<any>;
    initValues: BriefRecordType<WaterParams>;
    onValuesChange: (params: BriefRecordType<WaterParams>) => any;
}

// Render props component
export interface ViewDataProps<T> {
    data: BriefRecordType<T>;
}

export interface TableWithEditSectionProps {
    title: string;
    store: BasicTableWithEditStore<any>;
    validator: Validator<any>;
    renderEdit: (params: RenderPropsParams) => void;
    renderView: (database: BriefRecordType<any>) => void;
}

export interface TableWithEditSectionState {
    warning: boolean;
    status: 'idle' | 'edit' | 'view';
}

@observer
export class TableWithEditSection extends React.Component<
    TableWithEditSectionProps,
    TableWithEditSectionState
> {
    public state: TableWithEditSectionState = {
        warning: false,
        status: 'idle'
    };

    public store = this.props.store;

    public formRef: React.RefObject<any> = React.createRef();

    public createNew = () => {
        this.store.createNew();
        this.setState({ status: 'edit' });
    };

    public toView = (key: string) => {
        this.store.edit(key);
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
        // SaveAs vs. Save
        const realRecord =
            name === undefined ? this.store.activeRecord : { ...this.store.activeRecord, name };
        const realKey = name === undefined ? this.store.activeKey! : '';
        // Validate
        if (
            !Automation.formValidator(
                this.props.validator,
                realRecord,
                realKey,
                this.store.tableList,
                ValidLevels.Error
            )
        )
            return;

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
        if (confirm || this.state.status === 'view') {
            this.setState({ status: 'idle' });
            this.store.resetActive();
            this.setState({ warning: false });
        } else {
            this.setState({ warning: true });
        }
    };

    public changeParams = (allParams: BriefRecordType<any>) => {
        this.store.changeParams(allParams);
    };

    public render() {
        const { warning, status } = this.state;
        const { title } = this.props;
        const { changesMade, activeKey, activeRecord, tableList } = this.store;
        const { Edit, Save, SaveAs, Cancel } = OperationPanelButtons;
        return (
            <div className={styles.container}>
                <div className={styles.title}>{title}</div>
                <div className={styles.table}>
                    <RecordList
                        database={tableList}
                        disabled={status === 'edit'}
                        toView={this.toView}
                        toDelete={this.toDelete}
                        />
                </div>
                <div className={styles.rightColumn}>
                    <div className={styles.edit}>
                        {status === 'idle' ? <IdleStatePrompt onCreate={this.createNew} /> : null}
                        {status === 'view' ? this.props.renderView(activeRecord) : null}
                        {status === 'edit'
                            ? this.props.renderEdit({
                                  form: this.formRef,
                                  initValues: activeRecord,
                                  onValuesChange: this.changeParams.bind(this)
                              })
                            : null}
                    </div>
                    <div className={styles.panel}>
                        {status !== 'idle' ? (
                            <OperationPanel
                                buttons={
                                    status === 'view'
                                        ? [Edit, SaveAs, Cancel]
                                        : [Save, SaveAs, Cancel]
                                }
                                saveDisabled={!changesMade}
                                warning={warning}
                                onEdit={() => this.setState({ status: 'edit' })}
                                onSave={() => this.save()}
                                onSavedAs={(newName: string) => this.save(newName)}
                                onTriggerCancel={() => this.triggerStatusChange()}
                                onQuitCancel={() => this.setState({ warning: false })}
                                onConfirmCancel={() => this.triggerStatusChange(true)}
                                onPopConfirmChange={(s: boolean) => this.setState({ warning: s })}
                                />
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}
