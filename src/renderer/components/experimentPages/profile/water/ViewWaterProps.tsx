import * as React from 'react';
import { Divider, Form } from 'antd';

import { calcDensityAndViscosity } from './calculation';
import { WaterInputParams } from '../../../../store/experiment.store';

export const ViewWaterProps: React.FunctionComponent<WaterInputParams> = data => {
    const { pressure, temperature, useDensity, useViscosity } = data;
    const [densityVal, viscosityVal] = calcDensityAndViscosity(temperature);
    return (
        <>
            <Form.Item label="Pressure">
                <span>{`${pressure} atm`}</span>
            </Form.Item>
            <Form.Item label="Temperature">
                <span>{`${temperature} ℃`}</span>
            </Form.Item>
            <Divider orientation="left">Correlations</Divider>
            <Form.Item label="Density">
                <span>{useDensity ? densityVal : 'N/A'}</span>
            </Form.Item>
            <Form.Item label="Viscosity">
                <span>{useViscosity ? viscosityVal : 'N/A'}</span>
            </Form.Item>
        </>
    );
};
