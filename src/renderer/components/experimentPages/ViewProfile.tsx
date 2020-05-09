import * as React from 'react';
import { Tabs } from 'antd';

import { BriefRecordType } from '../../store/base';
import { ExpProfileParams } from '../../store/experiment.store';
import { ViewBasicInfo } from '../common/BasicInfo';

export interface ViewProfileProps {
    data: BriefRecordType<ExpProfileParams>;
}

export const ViewProfile: React.FunctionComponent<ViewProfileProps> = ({ data }) => {
    const { TabPane } = Tabs;
    const { name, description } = data;

    return (
        <Tabs defaultActiveKey="basic">
            <TabPane tab="Basic" key="basic">
                <ViewBasicInfo name={name} description={description} />
            </TabPane>
            <TabPane tab="Water" key="water" />
            <TabPane tab="Fixed Bed" key="bed" />
            <TabPane tab="Phys. Chem. Properties" key="physchem" />
            <TabPane tab="PSDM Simulation" key="psdm" />
        </Tabs>
    );
};
