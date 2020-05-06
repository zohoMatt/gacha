import * as React from 'react';
import { Divider, Form } from 'antd';

import { ViewBasicInfo } from '../common/BasicInfo';
import { Calculation } from '../../../../mods/calculation/basic';
import { Water } from '../../../../mods/calculation/waterProperties.maths';
import { WaterParams } from '../../../store/water.store';
import { ViewDataProps } from '../../container/TableWithEditSection';

const ViewWaterProps: React.FunctionComponent<ViewDataProps<WaterParams>> = ({ data }) => {
    const { name, description, pressure, temperature, density, viscosity } = data;
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
                <span>
                    {density.use ? Calculation.display(Water.density(temperature)) : 'Not applied'}
                </span>
            </Form.Item>
            <Form.Item label="Viscosity">
                <span>
                    {viscosity.use
                        ? Calculation.display(Water.viscosity(temperature))
                        : 'Not applied'}
                </span>
            </Form.Item>
        </Form>
    );
};

export { ViewWaterProps };
