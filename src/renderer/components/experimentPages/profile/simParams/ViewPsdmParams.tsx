import * as React from 'react';
import { Descriptions } from 'antd';

import { PsdmInputParams } from '../../../../store/experiment.store';
import { WeakTitle } from '../../../common/elements/WeakTitle';

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
            <Descriptions>
                <Descriptions.Item label="Total Run Time">{`${totalRunTime} d`}</Descriptions.Item>
                <Descriptions.Item label="First Point Displayed">
                    {`${firstPointDisplayed} d`}
                </Descriptions.Item>
                <Descriptions.Item label="Time Step">{`${timeStep} d`}</Descriptions.Item>
                <Descriptions.Item label="Number of Axial Elements">
                    {`${numOfAxialElms}`}
                </Descriptions.Item>
            </Descriptions>
            <Descriptions title={<WeakTitle title="Number of Collocation Points" />}>
                <Descriptions.Item label="Axial Direction">
                    {`${axialCollocatPts}`}
                </Descriptions.Item>
                <Descriptions.Item label="Radial Direction">
                    {`${radialCollocatPts}`}
                </Descriptions.Item>
            </Descriptions>
        </>
    );
};
