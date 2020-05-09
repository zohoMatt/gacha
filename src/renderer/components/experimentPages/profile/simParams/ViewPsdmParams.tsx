import * as React from 'react';
import { Divider, Form } from 'antd';

import { PsdmInputParams } from '../../../../store/experiment.store';

export const ViewPsdmParams: React.FunctionComponent<PsdmInputParams> = data => {
    const {
        totalRunTime,
        firstPointDisplayed,
        timeStep,
        numOfAxialElms,
        axialCollocatPts,
        radialCollocatPts
    } = data;
    return (
        <>
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
        </>
    );
};
