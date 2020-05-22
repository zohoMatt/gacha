import { observer } from 'mobx-react';
import * as React from 'react';
import { message, Col, Row, Typography } from 'antd';

import { OperationPanel, OperationPanelButtons } from '../OperationPanel';
import { RecordList } from '../RecordList';
import { IdleStatePrompt } from '../elements/IdleStatePrompt';

import { BriefRecordType, BasicTableWithEditStore } from '../../../store/base';
import { ErrorBoundary } from '../ErrorBoundary';

const styles = require('./TableWithEditSection.module.less');

export interface RenderPropsParams {
    form: React.RefObject<any>;
    initValues: BriefRecordType<any>;
    onValuesChange: (...args: any[]) => any;
}

// Render props component
export interface EditProps {
    form: React.RefObject<any>;
    initValues: BriefRecordType<any>;
    onValuesChange: (params: BriefRecordType<any>) => any;
}

export interface TableWithEditSectionProps {
    title: string;
    store: BasicTableWithEditStore<any>;
    renderEdit: (params: RenderPropsParams) => void;
    renderView: (database: BriefRecordType<any>) => void;
}

export interface TableWithEditSectionState {
    warning: boolean;
    status: 'idle' | 'edit' | 'view';
    tableList: any[];
}

@observer
export class TableWithEditSection extends React.Component<
    TableWithEditSectionProps,
    TableWithEditSectionState
> {
    public state: TableWithEditSectionState = {
        warning: false,
        status: 'idle',
        tableList: []
    };

    public store = this.props.store;

    public formRef: React.RefObject<any> = React.createRef();

    public componentDidMount() {
        // URL
        const key = this.getQueryParam();
        if (key) this.toView(key);

        // Data
        this.fetchList();
    }

    public componentWillUnmount() {
        this.store.resetActive();
    }

    public getQueryParam() {
        const params = window.location.href.split('?')[1];
        if (!params) return '';
        const keyQuery = params.split('&').find(str => str.indexOf('key') === 0);
        if (!keyQuery) return '';
        return keyQuery.split('=')[1];
    }

    public createNew = () => {
        this.store.createNew();
        this.setState({ status: 'edit' });
    };

    public toView = async (key: string) => {
        try {
            await this.store.edit(key);
            this.setState({ status: 'view' });
        } catch (e) {
            console.error(e);
        }
    };

    public toDelete = async (key: string) => {
        // if deleting current
        if (key === this.store.activeKey) {
            this.setState({ status: 'idle' });
        }

        await this.store.deleteRecord(key);
        message.info('Successfully deleted');

        // Refresh data
        return this.fetchList();
    };

    public save = async (name?: string) => {
        // Validate
        const form = this.formRef.current;
        if (this.state.status === 'edit') {
            let valid = true;
            try {
                await form.validateFields();
            } catch (errors) {
                console.warn(errors);
                message.error(errors.errorFields[0].errors[0]);
                valid = false;
            }
            if (!valid) return;
        }

        if (name === undefined) {
            await this.store.save();
            this.setState({ status: 'view' });
        } else {
            await this.store.saveAs(name);
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
        this.store.updateActiveRecord(allParams);
    };

    public async fetchList() {
        return this.store.tableList().then(tableList => this.setState({ tableList }));
    }

    public render() {
        const { warning, status, tableList } = this.state;
        const { title } = this.props;
        const { activeRecord } = this.store;
        const { Edit, Save, SaveAs, Cancel } = OperationPanelButtons;
        return (
            <Row className={styles.container} gutter={24}>
                <div className={styles.title}>
                    <Typography.Title level={3}>{title}</Typography.Title>
                </div>
                <Col className={styles.table} span={6}>
                    <RecordList
                        database={tableList}
                        disabled={status === 'edit'}
                        toView={this.toView}
                        toDelete={this.toDelete}
                        />
                </Col>
                <Col className={styles.rightColumn} span={17}>
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
                </Col>
            </Row>
        );
    }
}
