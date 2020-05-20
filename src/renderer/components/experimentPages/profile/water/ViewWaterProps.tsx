import * as React from 'react';
import { Descriptions } from 'antd';

import { calcDensityAndViscosity } from './calculation';
import { WeakTitle } from '../../../common/elements/WeakTitle';
import { Calculation } from '../../../../../mods/calculation/basic';
import { WaterInputParams } from '../../../../../utils/storage/types';

export const ViewWaterProps: React.FunctionComponent<WaterInputParams> = data => {
    const { pressure, temperature, useDensity, useViscosity } = data;
    const [density, viscosity] = calcDensityAndViscosity(temperature);
    const { display } = Calculation;

    return (
        <>
            <Descriptions>
                <Descriptions.Item label="Pressure">{display(pressure)}</Descriptions.Item>
                <Descriptions.Item label="Temperature" span={2}>
                    {display(temperature)}
                </Descriptions.Item>
            </Descriptions>
            <Descriptions title={<WeakTitle title="Correlation" />}>
                <Descriptions.Item label="Density">
                    {useDensity ? display(density) : 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label="Viscosity">
                    {useViscosity ? display(viscosity) : 'N/A'}
                </Descriptions.Item>
            </Descriptions>
        </>
    );
};
