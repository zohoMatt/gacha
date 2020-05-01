import * as React from 'react';
import { Divider, Form } from 'antd';

import { BriefRecordType } from '../../../store/types';
import { PsdmParams } from '../../../store/psdm.store';

export interface ViewWaterPropsComponentProps {
    data: BriefRecordType<PsdmParams>;
}

const ViewPsdmParams: React.FunctionComponent<ViewWaterPropsComponentProps> = ({ data }) => {
    const {
        name,
        description,
        totalRunTime,
        firstPointDisplayed,
        timeStep,
        numOfAxialElms,
        axialCollocatPts,
        radialCollocatPts
    } = data;
    return (
        <Form size="small" layout="horizontal" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
            <Form.Item label="Name">
                <span>{name}</span>
            </Form.Item>
            <Form.Item label="Description">
                <span>{description}</span>
            </Form.Item>
            <Divider orientation="left">Basic</Divider>
            <Form.Item label="Total Run Time">
                <span>{`${totalRunTime} d`}</span>
            </Form.Item>
            <Form.Item label="First Point Displayed">
                <span>{`${firstPointDisplayed} d`}</span>
            </Form.Item>
            <Form.Item label="Time Step">
                <span>{`${timeStep} d`}</span>
            </Form.Item>
            <Form.Item label="Number of Axial Elements">
                <span>{`${numOfAxialElms}`}</span>
            </Form.Item>
            <Divider orientation="left">Number of Collocation Points</Divider>
            <Form.Item label="Axial Direction">
                <span>{`${axialCollocatPts}`}</span>
            </Form.Item>
            <Form.Item label="Radial Direction">
                <span>{`${radialCollocatPts}`}</span>
            </Form.Item>
        </Form>
    );
};

export { ViewPsdmParams };
