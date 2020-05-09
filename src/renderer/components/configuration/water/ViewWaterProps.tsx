import * as React from 'react';
import { Divider, Form } from 'antd';

import { ViewBasicInfo } from '../common/BasicInfo';
import { WaterParams } from '../../../store/water.store';
import { ViewDataProps } from '../../container/TableWithEditSection';
import { calcDensityAndViscosity } from './calculation';

export const ViewWaterProps: React.FunctionComponent<ViewDataProps<WaterParams>> = ({ data }) => {
    const { name, description, pressure, temperature, density, viscosity } = data;
    const [densityVal, viscosityVal] = calcDensityAndViscosity(temperature);
    return (
        <Form size="small" layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 8 }}>
            <ViewBasicInfo name={name} description={description} />
            <Divider orientation="left" />
            <Form.Item label="Pressure">
                <span>{`${pressure} atm`}</span>
            </Form.Item>
            <Form.Item label="Temperature">
                <span>{`${temperature} ℃`}</span>
            </Form.Item>
            <Divider orientation="left">Correlations</Divider>
            <Form.Item label="Density">
                <span>{density.use ? densityVal : 'N/A'}</span>
            </Form.Item>
            <Form.Item label="Viscosity">
                <span>{viscosity.use ? viscosityVal : 'N/A'}</span>
            </Form.Item>
        </Form>
    );
};
