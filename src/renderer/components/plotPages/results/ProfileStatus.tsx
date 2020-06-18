import * as React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Popover, Select, Table } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons/lib';
import { inject, observer } from 'mobx-react';
import { unit } from 'mathjs';

import { StoreInjectedProp } from '../../../store';
import { ITEM_KEYS, NAV_KEYS } from '../../nav/NavBar';
import { Workspace } from '../../common/container/Workspace';
import { Calculation } from '../../../../mods/calculation/basic';
import { GraphProcessingStatus } from '../../../../utils/storage/types';
import { EssentialProfileInput, FullProfile } from '../../../../mods/calculation/types';
import { PROFILE_DESCRIPTION_DICT, TABLE_COLUMNS } from '../../../../mods/calculation/configs';

const styles = require('./ProfileStatus.module.less');

const { Option } = Select;

const LEFT_FIXED_COLS = [
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        fixed: 'left',
        width: 100,
        render(val: GraphProcessingStatus) {
            return (
                <>
                    {val === GraphProcessingStatus.Idle ? (
                        <Badge status="default" text="In queue" />
                    ) : null}
                    {val === GraphProcessingStatus.Processing ? (
                        <Badge status="processing" text="Running" />
                    ) : null}
                    {val === GraphProcessingStatus.Success ? (
                        <Badge status="success" text="Done" />
                    ) : null}
                    {val === GraphProcessingStatus.Error ? (
                        <Badge status="error" text="Error" />
                    ) : null}
                </>
            );
        }
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
        width: 100
    }
];
const RIGHT_FIXED_COLS = [
    {
        title: 'View',
        key: 'action',
        fixed: 'right',
        width: 100,
        render: (val: any, record: any) => {
            return (
                <span style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
                    <Link
                        to={`/workspace/${NAV_KEYS.Experiment}/${ITEM_KEYS.Profile}?key=${record.key}`}>
                        Profile
                    </Link>
                    <a style={{ marginLeft: '1vw' }}>Plot</a>
                </span>
            );
        }
    }
];

export const ProfileStatus: React.FC<StoreInjectedProp> = inject('store')(
    observer(({ store }) => {
        // Hooks
        const [tableData, setTableData] = React.useState([]);
        const [columns, setCols] = React.useState(
            LEFT_FIXED_COLS.concat(RIGHT_FIXED_COLS as any[])
        );
        React.useEffect(() => {
            store!.graph.profileStatusTableData().then(setTableData as any);
        }, [0]);

        const onSelect = (values: string, options: any) => {
            const selectedCols = options.map((opt: any, i: number) => {
                const { unit: columnUnit } = PROFILE_DESCRIPTION_DICT[
                    opt.key as keyof EssentialProfileInput
                ];
                return {
                    title: opt.children.toString(),
                    children: [
                        {
                            key: opt.key,
                            title: Calculation.display(columnUnit),
                            dataIndex: opt.key,
                            width: 150,
                            render: (text: string) =>
                                Calculation.format(unit(text).toNumber(columnUnit))
                        }
                    ]
                };
            });
            setCols(LEFT_FIXED_COLS.concat(selectedCols).concat(RIGHT_FIXED_COLS as any));
        };

        const options = TABLE_COLUMNS.map((key: string) => (
            <Option key={key} value={key}>
                {PROFILE_DESCRIPTION_DICT[key as keyof FullProfile].name}
            </Option>
        ));

        const TIPS = 'Search and select multiple fields for the table to display.';

        return (
            <Workspace title="Profile Status">
                <div className={styles.selector}>
                    <Select
                        showSearch
                        mode="multiple"
                        placeholder="Select fields to display below"
                        optionFilterProp="children"
                        style={{ width: '70%' }}
                        onChange={onSelect}
                        filterOption={(input: string, option: any) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                        {options}
                    </Select>
                    <Popover content={TIPS} placement="left">
                        <QuestionCircleOutlined className={styles.questionMark} />
                    </Popover>
                </div>
                <Table
                    size="small"
                    style={{ height: '100%' }}
                    dataSource={tableData}
                    scroll={{ x: 600 }}
                    columns={columns as any}
                    />
            </Workspace>
        );
    })
);
