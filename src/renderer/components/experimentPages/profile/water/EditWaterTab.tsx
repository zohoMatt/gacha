import * as React from 'react';
import { Divider, Form, Input, Switch } from 'antd';

import { WaterValidator } from '../../../../../mods/validators/water.validator';
import { calcDensityAndViscosity } from './calculation';
import { Calculation } from '../../../../../mods/calculation/basic';
import { WaterInputParams } from '../../../../../utils/storage/types';

export const EditWaterTab: React.FunctionComponent<WaterInputParams> = initValues => {
    const { temperature } = initValues;
    const vdator = new WaterValidator();

    const { display } = Calculation;
    const [density, viscosity] = calcDensityAndViscosity(temperature);

    return (
        <>
            <Form.Item
                name={['water', 'pressure', 'value']}
                label="Pressure"
                rules={vdator.getFormValidators('pressure')}
                normalize={v => (v ? +v : '')}>
                <Input type="number" addonAfter="atm" />
            </Form.Item>
            <Form.Item
                name={['water', 'temperature', 'value']}
                label="Temperature"
                rules={vdator.getFormValidators('temperature')}
                normalize={v => (v ? +v : '')}>
                <Input type="number" addonAfter="℃" />
            </Form.Item>
            <Divider orientation="left">Correlations</Divider>
            <Form.Item label="Density">
                <Form.Item name={['water', 'useDensity']} valuePropName="checked" noStyle>
                    <Switch />
                </Form.Item>
                <span style={{ marginLeft: '0.5vw' }}>
                    {temperature.value < 100 && temperature.value > 0 ? display(density) : '-'}
                </span>
            </Form.Item>
            <Form.Item label="Viscosity">
                <Form.Item name={['water', 'useViscosity']} valuePropName="checked" noStyle>
                    <Switch />
                </Form.Item>
                <span style={{ marginLeft: '0.5vw' }}>
                    {temperature.value < 100 && temperature.value > 0 ? display(viscosity) : '-'}
                </span>
            </Form.Item>
        </>
    );
};
