import * as React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const styles = require('./IdleStatePrompt.module.less');

export interface IdleStatePromptProps {
    onCreate: () => any;
}

const IdleStatePrompt: React.FunctionComponent<IdleStatePromptProps> = ({ onCreate }) => {
    return (
        <div className={styles.container}>
            <div className={styles.instruction}>
                Click <span className={styles.fakeLink}>View</span> button of any entry from the
                list to start editing.
            </div>
            <div className={styles.instruction}>
                Or click `New` button below to create a new entry.
            </div>
            <div className={styles.button}>
                <Button icon={<PlusOutlined />} onClick={onCreate}>
                    New
                </Button>
            </div>
        </div>
    );
};

export { IdleStatePrompt };
