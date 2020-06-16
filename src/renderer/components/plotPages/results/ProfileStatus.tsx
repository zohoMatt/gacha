import * as React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Popover, Select, Table } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons/lib';
import { inject, observer } from 'mobx-react';

import { StoreInjectedProp } from '../../../store';
import { ITEM_KEYS, NAV_KEYS } from '../../nav/NavBar';
import { Workspace } from '../../common/container/Workspace';
import {
    EssentialProfileInput,
    PROFILE_DESCRIPTION_DICT
} from '../../../../mods/calculation/profile.maths';
import { Calculation } from '../../../../mods/calculation/basic';
import { GraphProcessingStatus } from '../../../../utils/storage/storage';

const styles = require('./ProfileStatus.module.less');

const { Option } = Select;

export const ProfileStatus: React.FC<StoreInjectedProp> = inject('store')(
    observer(({ store }) => {
        // Hooks
        const [tableData, setTableData] = React.useState([]);
        React.useEffect(() => {
            store!.graph.profileStatusTableData().then(data => {
                setTableData(data as any);
                console.log(data);
            });
        }, [0]);

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
        const [columns, setCols] = React.useState(
            LEFT_FIXED_COLS.concat(RIGHT_FIXED_COLS as any[])
        );

        const onSelect = (values: string, options: any) => {
            const selectedCols = options.map((opt: any, i: number) => ({
                title: opt.children.toString(),
                children: [
                    {
                        key: opt.key,
                        title: Calculation.display(
                            PROFILE_DESCRIPTION_DICT[opt.key as keyof EssentialProfileInput].unit
                        ),
                        dataIndex: opt.key
                    }
                ],
                width: i === 0 ? 150 : undefined
            }));
            setCols(LEFT_FIXED_COLS.concat(selectedCols).concat(RIGHT_FIXED_COLS as any));
        };

        const options = Object.entries(PROFILE_DESCRIPTION_DICT).map(([key, { name }]) => (
            <Option key={key} value={key}>
                {name}
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
                    scroll={{ x: 1300 }}
                    columns={columns as any}
                    />
            </Workspace>
        );
    })
);
