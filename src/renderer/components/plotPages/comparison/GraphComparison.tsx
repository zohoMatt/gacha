import * as React from 'react';
import { Tabs } from 'antd';

import { MultiLineScatterGraph } from './concentrationByTime/MultiLineScatterGraph';
import { ContourGraph } from './penetrationProcess/ContourGraph';
import { Workspace } from '../../common/container/Workspace';

export const GraphComparison: React.FC = () => {
    const { TabPane } = Tabs;

    return (
        <Workspace title="Comparison of Results">
            <Tabs defaultActiveKey="scatter">
                <TabPane tab="Scatter Plot" key="scatter">
                    <MultiLineScatterGraph />
                </TabPane>
                <TabPane tab="Contour Graph" key="contour">
                    <ContourGraph />
                </TabPane>
            </Tabs>
        </Workspace>
    );
};
