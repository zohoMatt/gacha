import * as React from 'react';
import { Transfer, Table } from 'antd';
import { difference } from '../../../utils/array';

export interface DataSetEntry<T> {
    key: string;
    name: string;
    description: string;
    params: T;
    active: boolean;
    disabled?: boolean;
}

export interface DataSetSelectorProps<T> {
    database: Array<DataSetEntry<T>>;
}

export interface DataSetSelectorState<T> {
    disabled: boolean;
    targetKeys: string[];
    selectedKeys: string[];
}

const columns = (
    toEdit: (r: DataSetEntry<any>) => (e: any) => any,
    toDelete: (r: DataSetEntry<any>) => (e: any) => any
) => [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description'
    },
    {
        title: 'Action',
        key: 'action',
        render: (text: string, record: DataSetEntry<any>) => {
            return (
                <span>
                    <a style={{ marginRight: '3vw' }} onClick={toEdit(record)}>
                        Edit
                    </a>
                    <a onClick={toDelete(record)}>Delete</a>
                </span>
            );
        }
    }
];

export default class DataSetSelector extends React.Component<
    DataSetSelectorProps<any>,
    DataSetSelectorState<any>
> {
    protected static toEdit(record: DataSetEntry<any>) {
        return (e: any) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('edit', record);
        };
    }

    protected static toDelete(record: DataSetEntry<any>) {
        return (e: any) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('delete', record);
        };
    }

    protected static search(input: string, record: any) {
        return Object.values(record).some(v => typeof v === 'string' && v.indexOf(input) !== -1);
    }

    constructor(props: DataSetSelectorProps<any>) {
        super(props);
        this.state = {
            disabled: false, // need to move to redux
            targetKeys: this.props.database.filter(entry => entry.active).map(e => e.key),
            selectedKeys: []
        };
    }

    protected handleTransfer(nextTargetKeys: string[], direction: string, moveKeys: string[]) {
        this.setState({ targetKeys: nextTargetKeys });
    }

    public render() {
        const { database } = this.props;
        const { targetKeys } = this.state;
        const { toEdit, toDelete, search } = DataSetSelector;
        return (
            <Transfer
                dataSource={database}
                targetKeys={targetKeys}
                onChange={this.handleTransfer.bind(this)}
                listStyle={{}}
                showSearch={true}
                filterOption={search}
                showSelectAll={false}>
                {({
                    direction,
                    filteredItems,
                    onItemSelectAll,
                    onItemSelect,
                    selectedKeys: listSelectedKeys,
                    disabled: listDisabled
                }) => {
                    const rowSelectionProp = {
                        getCheckboxProps(record: DataSetEntry<any>) {
                            return { disabled: record.disabled || listDisabled };
                        },
                        onSelectAll(selected: boolean, selectedRows: DataSetEntry<any>[]) {
                            const changedKeys = selectedRows
                                .filter(r => !r.disabled)
                                .map(r => r.key);
                            const diffs = selected
                                ? difference<string>(changedKeys, listSelectedKeys)
                                : difference<string>(listSelectedKeys, changedKeys);
                            onItemSelectAll(diffs, selected);
                        },
                        onSelect(record: DataSetEntry<any>, selected: boolean) {
                            onItemSelect(record.key, selected);
                        },
                        selectedRowKeys: listSelectedKeys
                    };

                    const onRow = (record: DataSetEntry<any>) => {
                        return {
                            onClick() {
                                if (record.disabled || listDisabled) return;
                                onItemSelect(record.key, !listSelectedKeys.includes(record.key));
                            }
                        };
                    };

                    return (
                        <Table
                            dataSource={filteredItems as any}
                            columns={columns(toEdit, toDelete)}
                            rowSelection={rowSelectionProp}
                            size="small"
                            style={{ pointerEvents: listDisabled ? 'none' : undefined }}
                            onRow={onRow}
                            />
                    );
                }}
            </Transfer>
        );
    }
}
