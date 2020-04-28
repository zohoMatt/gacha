import * as React from 'react';
import { Input, Popconfirm, Table } from 'antd';

import { DataSetEntry } from '../../store/types';

const styles = require('./RecordList.module.less');

export interface RecordListProps {
    database: Array<DataSetEntry<any>>;
    toEdit: (key: string) => any;
    toDelete: (key: string) => any;
}

const RecordList: React.FunctionComponent<RecordListProps> = ({ database, toEdit, toDelete }) => {
    const [search, setSearch] = React.useState('');

    const TITLE = 'Are you sure to DELETE this entry?';

    const editIt = (record: DataSetEntry<any>) => (e: any) => {
        toEdit(record.key);
    };
    const deleteIt = (record: DataSetEntry<any>) => (e: any) => {
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
                        <a style={{ marginRight: '1vw' }} onClick={editIt(record)}>
                            Edit
                        </a>
                        <Popconfirm
                            placement="right"
                            title={TITLE}
                            onConfirm={deleteIt(record)}
                            okText="Yes"
                            cancelText="No">
                            <a>Delete</a>
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
