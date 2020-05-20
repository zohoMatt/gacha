import * as React from 'react';
import { Descriptions } from 'antd';

import { PsdmInputParams } from '../../../../store/expProfile.store';
import { WeakTitle } from '../../../common/elements/WeakTitle';
import { Calculation } from '../../../../../mods/calculation/basic';

export const ViewPsdmParams: React.FunctionComponent<PsdmInputParams> = data => {
    const {
        totalRunTime,
        firstPointDisplayed,
        timeStep,
        numOfAxialElms,
        axialCollocatPts,
        radialCollocatPts
    } = data;

    const d = Calculation.display;

    return (
        <>
            <Descriptions>
                <Descriptions.Item label="Total Run Time">{d(totalRunTime)}</Descriptions.Item>
                <Descriptions.Item label="First Point Displayed">
                    {d(firstPointDisplayed)}
                </Descriptions.Item>
                <Descriptions.Item label="Time Step">{d(timeStep)}</Descriptions.Item>
                <Descriptions.Item label="Number of Axial Elements">
                    {numOfAxialElms}
                </Descriptions.Item>
            </Descriptions>
            <Descriptions title={<WeakTitle title="Number of Collocation Points" />}>
                <Descriptions.Item label="Axial Direction">{axialCollocatPts}</Descriptions.Item>
                <Descriptions.Item label="Radial Direction">{radialCollocatPts}</Descriptions.Item>
            </Descriptions>
        </>
    );
};
