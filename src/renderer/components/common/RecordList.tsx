import * as React from 'react';
import { Table } from 'antd';

import { DataSetEntry } from '../../store/initial';

export interface RecordListProps {
    database: Array<DataSetEntry<any>>;
}

const RecordList: React.FunctionComponent<RecordListProps> = ({ database }) => {
    const toEdit = (record: DataSetEntry<any>) => (e: any) => {
        console.log('to edit', record);
    };
    const toDelete = (record: DataSetEntry<any>) => (e: any) => {
        console.log('to delete', record);
    };
    const toView = (record: DataSetEntry<any>) => (e: any) => {
        console.log('to view', record);
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
                        <a style={{ marginRight: '1vw' }} onClick={toEdit(record)}>
                            Edit
                        </a>
                        <a onClick={toDelete(record)}>Delete</a>
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
