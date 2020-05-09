import * as React from 'react';
import { Form, Tabs } from 'antd';

import { BriefRecordType } from '../../store/base';
import { ExpProfileParams } from '../../store/experiment.store';
import { ViewBasicInfo } from '../common/BasicInfo';
import { ViewWaterProps } from './profile/water/ViewWaterProps';
import { ViewBedProps } from './profile/bed/ViewBedProps';
import { ViewAdsorptionData } from './profile/adsorption/ViewAdsorptionData';
import { ViewPsdmParams } from './profile/simParams/ViewPsdmParams';

export interface ViewProfileProps {
    data: BriefRecordType<ExpProfileParams>;
}

export const ViewProfile: React.FunctionComponent<ViewProfileProps> = ({ data }) => {
    const { TabPane } = Tabs;
    const { name, description, water, bed, psdm, adsorption } = data;

    return (
        <Form size="small" layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 8 }}>
            <Tabs defaultActiveKey="basic">
                <TabPane tab="Basic" key="basic">
                    <ViewBasicInfo name={name} description={description} />
                </TabPane>
                <TabPane tab="Water" key="water">
                    <ViewWaterProps {...water} />
                </TabPane>
                <TabPane tab="Fixed Bed" key="bed">
                    <ViewBedProps {...bed} />
                </TabPane>
                <TabPane tab="Phys. Chem. Properties" key="physchem">
                    <ViewAdsorptionData {...adsorption} />
                </TabPane>
                <TabPane tab="PSDM Simulation" key="psdm">
                    <ViewPsdmParams {...psdm} />
                </TabPane>
            </Tabs>
        </Form>
    );
};
