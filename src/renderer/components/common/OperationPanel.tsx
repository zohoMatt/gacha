import * as React from 'react';
import { Button, Input, Popconfirm, Popover } from 'antd';

const styles = require('./OperationPanel.module.less');

export interface OperationPanelProps {
    saveDisabled: boolean;
    warning?: boolean;
    onSavedAs: any;
    onSave: any;
    onQuitCancel: any;
    onConfirmCancel: any;
    onTriggerCancel: any;
}

export interface OperationPanelState {
    inputNewName: string;
}

export class OperationPanel extends React.Component<OperationPanelProps> {
    public state: OperationPanelState = { inputNewName: 'New Setting' };

    public onChange = (e: any) => {
        this.setState({ inputNewName: e.target.value });
    };

    public render() {
        const {
            saveDisabled,
            warning,
            onSavedAs,
            onSave,
            onTriggerCancel,
            onQuitCancel,
            onConfirmCancel
        } = this.props;
        const { inputNewName } = this.state;
        return (
            <div className={styles.btnPanel}>
                <Button disabled={saveDisabled} type="primary" onClick={onSave}>
                    Save
                </Button>
                <Popover
                    content={
                        <div>
                            <Input defaultValue={inputNewName} onChange={this.onChange} />
                            <a onClick={() => onSavedAs(inputNewName)}>Confirm</a>
                        </div>
                    }
                    title="New name..."
                    trigger="click">
                    <Button type="primary">Save as</Button>
                </Popover>
                <Popconfirm
                    placement="top"
                    title="Discard changes?"
                    visible={warning || false}
                    onConfirm={onConfirmCancel}
                    onCancel={onQuitCancel}>
                    <Button type="danger" ghost onClick={onTriggerCancel}>
                        Cancel
                    </Button>
                </Popconfirm>
            </div>
        );
    }
}
