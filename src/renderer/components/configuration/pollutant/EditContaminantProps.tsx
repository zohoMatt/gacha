import * as React from 'react';
import { Tabs } from 'antd';
import { EditProps } from '../../container/TableWithEditSection';

export const EditContaminantProps: React.FunctionComponent<EditProps> = ({
    form,
    initValues,
    onValuesChange
}) => {
    return (
        <Tabs defaultActiveKey="basic" onChange={() => null}>
            <Tabs.TabPane tab="Contaminant" key="basic"></Tabs.TabPane>
            <Tabs.TabPane tab="Kinetics" key="kinetics"></Tabs.TabPane>
            <Tabs.TabPane tab="Freundlich" key="f-model"></Tabs.TabPane>
        </Tabs>
    );
};
