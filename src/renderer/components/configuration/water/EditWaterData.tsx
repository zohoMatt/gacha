import * as React from 'react';
import { Divider, Form, Input, Switch } from 'antd';
import { inject, observer } from 'mobx-react';

import { TextSwitcher } from '../../common/TextSwticher';
import { ActiveEditing, WaterStore } from '../../../store/water.store';
import { Water } from '../../../../utils/calculation/waterProperties.maths';
import { Calculation } from '../../../../utils/calculation/basic';

const styles = require('./EditWaterData.module.less');

export interface EditWaterProps {
    form: React.RefObject<any>;
    // injected
    store?: WaterStore;
}

// export interface EditWaterState {
// }

@inject('store')
@observer
export class EditWaterData extends React.Component<EditWaterProps> {
    public changeParams = (allParams: ActiveEditing) => {
        this.props.store!.changeAllParams(allParams);
        console.log(allParams);
    };

    public render() {
        const { form, store } = this.props;
        const { activeRecord } = store!;
        const { temperature } = activeRecord!;
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
                        onValuesChange={(s, all: any) => this.changeParams(all)}
                        initialValues={activeRecord!}>
                        <Form.Item name="name" label="Name" rules={NORMAL_RULES}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="description" label="Description" rules={NORMAL_RULES}>
                            <Input />
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
                                    min: -1,
                                    max: 101,
                                    type: 'number',
                                    message: 'Warning: Abnormal value.',
                                    validateTrigger: 'onChange'
                                }
                            ]}
                            normalize={v => (v ? +v : '')}>
                            <Input type="number" addonAfter="℃" />
                        </Form.Item>
                        <Divider orientation="left">Correlations</Divider>
                        <Form.Item
                            name={['density', 'use']}
                            label="Density"
                            valuePropName="checked">
                            <TextSwitcher
                                text={
                                    temperature
                                        ? Calculation.display(Water.density(temperature))
                                        : '-'
                                }
                                />
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
    }
}
