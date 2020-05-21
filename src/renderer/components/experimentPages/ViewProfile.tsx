import * as React from 'react';
import { Divider, Descriptions } from 'antd';

import { BriefRecordType } from '../../store/base';
import { ViewWaterProps } from './profile/water/ViewWaterProps';
import { ViewBedProps } from './profile/bed/ViewBedProps';
import { ViewPsdmParams } from './profile/simParams/ViewPsdmParams';
import { CalculationResults } from './profile/CalculationResults';
import { ViewAdsorptionData } from './profile/adsorption/ViewAdsorptionData';
import { ExpProfileParams } from '../../../utils/storage/types';

export interface ViewProfileProps {
    data: BriefRecordType<ExpProfileParams>;
}

export const ViewProfile: React.FunctionComponent<ViewProfileProps> = ({ data }) => {
    const { name, description, water, bed, psdm, adsorption } = data;

    // Scroll to top when switching profile
    const containerRef = React.createRef<HTMLDivElement>();
    React.useEffect(() => {
        containerRef.current!.scroll({
            top: 0,
            behavior: 'smooth'
        });
    });

    return (
        <div ref={containerRef} style={{ height: '100%', overflow: 'scroll' }}>
            <Divider orientation="center">Info</Divider>
            <Descriptions>
                <Descriptions.Item label="Profile Name">{name}</Descriptions.Item>
                <Descriptions.Item label="Description">{description}</Descriptions.Item>
            </Descriptions>
            <Divider orientation="center">Water</Divider>
            <ViewWaterProps {...water} />
            <Divider orientation="center">Contaminant</Divider>
            <ViewAdsorptionData {...adsorption} />
            <Divider orientation="center">Fixed Bed</Divider>
            <ViewBedProps {...bed} />
            <Divider orientation="center">Simulation: PSDM</Divider>
            <ViewPsdmParams {...psdm} />
            <Divider orientation="center">Calculation Results</Divider>
            <CalculationResults />
        </div>
    );
};
