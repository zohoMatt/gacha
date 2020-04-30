import * as React from 'react';
import { Empty, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const styles = require('./IdleStatePrompt.module.less');

export interface IdleStatePromptProps {
    onCreate: () => any;
}

const IdleStatePrompt: React.FunctionComponent<IdleStatePromptProps> = ({ onCreate }) => {
    return (
        <div className={styles.container}>
            <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{ height: 60 }}
                description={
                    <>
                        Click <a>View</a> button of any entry from the list to start editing. <br />
                        Or click &apos;New&apos; button below to create a new entry.
                    </>
                }>
                <Button icon={<PlusOutlined />} onClick={onCreate}>
                    New
                </Button>
            </Empty>
        </div>
    );
};

export { IdleStatePrompt };
