import * as React from 'react';
import { Popconfirm, Table } from 'antd';

import { DataSetEntry } from '../../store/initial';

export interface RecordListProps {
    database: Array<DataSetEntry<any>>;
    toEdit: (key: string) => any;
    toDelete: (key: string) => any;
}

const RecordList: React.FunctionComponent<RecordListProps> = ({ database, toEdit, toDelete }) => {
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
    return (
        <Table style={{ height: '100%' }} dataSource={database} columns={COLUMNS} size="small" />
    );
};

export { RecordList };
