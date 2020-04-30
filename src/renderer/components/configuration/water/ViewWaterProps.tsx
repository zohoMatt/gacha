import * as React from 'react';
import { Divider, Form } from 'antd';

import { Calculation } from '../../../../utils/calculation/basic';
import { Water } from '../../../../utils/calculation/waterProperties.maths';
import { BriefRecordType } from '../../../store/types';
import { WaterParams } from '../../../store/water.store';

const styles = require('./ViewWaterProps.module.less');

export interface ViewWaterPropsComponentProps {
    data: BriefRecordType<WaterParams>;
}

const ViewWaterProps: React.FunctionComponent<ViewWaterPropsComponentProps> = ({ data }) => {
    const { name, description, pressure, temperature, density, viscosity } = data;
    return (
        <Form size="small" layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 8 }}>
            <Form.Item label="Name">
                <span className={styles.text}>{name}</span>
            </Form.Item>
            <Form.Item label="Description">
                <span className={styles.text}>{description}</span>
            </Form.Item>
            <Divider orientation="left">Basic</Divider>
            <Form.Item label="Pressure">
                <span className={styles.text}>{`${pressure} atm`}</span>
            </Form.Item>
            <Form.Item label="Temperature">
                <span className={styles.text}>{`${temperature} ℃`}</span>
            </Form.Item>
            <Divider orientation="left">Correlations</Divider>
            <Form.Item label="Density">
                <span className={styles.text}>
                    {density.use ? Calculation.display(Water.density(temperature)) : 'Not applied'}
                </span>
            </Form.Item>
            <Form.Item label="Viscosity">
                <span className={styles.text}>
                    {viscosity.use
                        ? Calculation.display(Water.viscosity(temperature))
                        : 'Not applied'}
                </span>
            </Form.Item>
        </Form>
    );
};

export { ViewWaterProps };
