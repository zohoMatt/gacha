import * as React from 'react';
import { Divider, Form, Input } from 'antd';

import { TextSwitcher } from '../../common/TextSwticher';
import { ActiveEditing } from '../../../store/water.store';
import { Water } from '../../../../utils/calculation/waterProperties.maths';
import { Calculation } from '../../../../utils/calculation/basic';

const styles = require('./EditWaterData.module.less');

export interface EditWaterProps {
    form: React.RefObject<any>;
    initValues: ActiveEditing;
    onValuesChange: (params: ActiveEditing) => any;
}

export const EditWaterData: React.FunctionComponent<EditWaterProps> = ({
    form,
    initValues,
    onValuesChange
}) => {
    const { temperature } = initValues;
    const NORMAL_RULES = [{ required: true, message: 'Value cannot be empty' }];

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <Form
                    size="small"
                    layout="horizontal"
                    ref={form}
                    hideRequiredMark={true}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 8 }}
                    onValuesChange={(s, all: any) => onValuesChange(all)}
                    initialValues={initValues}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[...NORMAL_RULES, { max: 20, type: 'string' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[...NORMAL_RULES, { max: 80, type: 'string' }]}>
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Divider orientation="left">Basic</Divider>
                    <Form.Item
                        name="pressure"
                        label="Pressure"
                        rules={[
                            ...NORMAL_RULES,
                            {
                                min: 0.9,
                                max: 1.1,
                                type: 'number',
                                message: 'Warning: Abnormal value.',
                                validateTrigger: 'onChange'
                            }
                        ]}
                        normalize={v => (v ? +v : '')}>
                        <Input type="number" addonAfter="atm" />
                    </Form.Item>
                    <Form.Item
                        name="temperature"
                        label="Temperature"
                        rules={[
                            ...NORMAL_RULES,
                            {
                                min: 0,
                                max: 100,
                                type: 'number',
                                validateTrigger: 'onChange'
                            }
                        ]}
                        normalize={v => (v ? +v : '')}>
                        <Input type="number" addonAfter="℃" />
                    </Form.Item>
                    <Divider orientation="left">Correlations</Divider>
                    <Form.Item label="Density">
                        <Form.Item name={['density', 'use']}>
                            <TextSwitcher
                                text={
                                    temperature
                                        ? Calculation.display(Water.density(temperature))
                                        : '-'
                                }
                                />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item name={['viscosity', 'use']} label="Viscosity">
                        <TextSwitcher
                            text={
                                temperature
                                    ? Calculation.display(Water.viscosity(temperature))
                                    : '-'
                            }
                            />
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
