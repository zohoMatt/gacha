import * as React from 'react';
import { Descriptions } from 'antd';

import { calcDensityAndViscosity } from './calculation';
import { WaterInputParams } from '../../../../store/experiment.store';
import { WeakTitle } from '../../../common/elements/WeakTitle';

export const ViewWaterProps: React.FunctionComponent<WaterInputParams> = data => {
    const { pressure, temperature, useDensity, useViscosity } = data;
    const [densityVal, viscosityVal] = calcDensityAndViscosity(temperature);
    return (
        <>
            <Descriptions>
                <Descriptions.Item label="Pressure">{`${pressure} atm`}</Descriptions.Item>
                <Descriptions.Item label="Temperature" span={2}>
                    {`${temperature} ℃`}
                </Descriptions.Item>
            </Descriptions>
            <Descriptions title={<WeakTitle title="Correlation" />}>
                <Descriptions.Item label="Density">
                    {useDensity ? densityVal : 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label="Viscosity">
                    {useViscosity ? viscosityVal : 'N/A'}
                </Descriptions.Item>
            </Descriptions>
        </>
    );
};
