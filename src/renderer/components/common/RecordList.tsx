import * as React from 'react';
import classnames from 'classnames';
import { Input, message, Popconfirm, Table } from 'antd';

import { DataSetEntry } from '../../store/types';

const styles = require('./RecordList.module.less');

export interface RecordListProps {
    database: Array<DataSetEntry<any>>;
    disabled: boolean;
    toView: (key: string) => any;
    toDelete: (key: string) => any;
}

const RecordList: React.FunctionComponent<RecordListProps> = ({
    database,
    disabled,
    toView,
    toDelete
}) => {
    const [search, setSearch] = React.useState('');

    const TITLE = 'Are you sure to DELETE this entry?';

    const viewIt = (record: DataSetEntry<any>) => (e: any) => {
        if (disabled) {
            message.warning('Please quit editing mode first');
            return;
        }
        toView(record.key);
    };
    const deleteIt = (record: DataSetEntry<any>) => (e: any) => {
        if (disabled) {
            message.warning('Please quit editing mode first');
            return;
        }
        toDelete(record.key);
    };

    const COLUMNS = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            colSpan: 1
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: DataSetEntry<any>) => {
                return (
                    <span>
                        <a
                            className={classnames({
                                [styles.leftLink]: true,
                                [styles.linkDisabled]: disabled
                            })}
                            onClick={viewIt(record)}>
                            View
                        </a>
                        <Popconfirm
                            placement="right"
                            disabled={disabled}
                            title={TITLE}
                            onConfirm={deleteIt(record)}
                            okText="Yes"
                            cancelText="No">
                            <a
                                className={classnames({
                                    [styles.linkDisabled]: disabled
                                })}>
                                Delete
                            </a>
                        </Popconfirm>
                    </span>
                );
            }
        }
    ];

    const filteredData = database.filter(
        r => r.name.indexOf(search) !== -1 || r.description.indexOf(search) !== -1
    );
    return (
        <>
            <div className={styles.inputPanel}>
                <Input.Search
                    placeholder="Search here..."
                    allowClear={true}
                    onSearch={setSearch}
                    onChange={e => setSearch(e.target.value)}
                    style={{ width: 200 }}
                    />
            </div>
            <Table
                style={{ height: '100%' }}
                dataSource={filteredData}
                columns={COLUMNS}
                size="small"
                />
        </>
    );
};

export { RecordList };
