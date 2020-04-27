import * as React from 'react';
import { Button, Input, Popconfirm, Popover } from 'antd';

const styles = require('./OperationPanel.module.less');

export interface OperationPanelProps {
    saveDisabled: boolean;
}

const OperationPanel: React.FunctionComponent<OperationPanelProps> = ({ saveDisabled }) => (
    <div className={styles.btnPanel}>
        <Button disabled={saveDisabled} type="primary">
            Save
        </Button>
        <Popover
            content={
                <div>
                    <Input />
                    <a>Confirm</a>
                    <a>Cancel</a>
                </div>
            }
            title="Name of new parameter group"
            trigger="click">
            <Button type="primary">Save as</Button>
        </Popover>
        <Popconfirm placement="top" title="Discard changes?" onConfirm={() => null}>
            <Button type="danger" ghost>
                Cancel
            </Button>
        </Popconfirm>
    </div>
);

export { OperationPanel };
