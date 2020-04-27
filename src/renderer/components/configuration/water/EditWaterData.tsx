import * as React from 'react';
import { Divider, Form, Input, Switch } from 'antd';
import { inject, observer } from 'mobx-react';

import { TextSwitcher } from '../../common/TextSwticher';
import { ActiveEditing, WaterStore } from '../../../store/water.store';

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
                            <Input disabled />
                        </Form.Item>
                        <Form.Item name="description" label="Description" rules={NORMAL_RULES}>
                            <Input />
                        </Form.Item>
                        <Divider orientation="left">Basic</Divider>
                        <Form.Item name="pressure" label="Pressure" rules={NORMAL_RULES}>
                            <Input type="number" addonAfter="atm" />
                        </Form.Item>
                        <Form.Item name="temperature" label="Temperature" rules={NORMAL_RULES}>
                            <Input type="number" addonAfter="℃" />
                        </Form.Item>
                        <Divider orientation="left">Correlations</Divider>
                        <Form.Item
                            name={['density', 'use']}
                            label="Density"
                            valuePropName="checked">
                            <Switch />
                        </Form.Item>
                        <TextSwitcher text="1.999" />
                        <Form.Item name={['viscosity', 'use']} label="Viscosity">
                            <TextSwitcher text="1.999" />
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}
