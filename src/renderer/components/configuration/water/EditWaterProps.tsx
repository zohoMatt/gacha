import * as React from 'react';
import { Divider, Form, Input, Select, Switch } from 'antd';

const styles = require('./EditWaterProps.module.less');

const EditWaterProps: React.FunctionComponent = () => (
    <div className={styles.container}>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
            <Divider orientation="left">Basic</Divider>
            <Form.Item name="pressure" label="Pressure">
                <Input addonAfter="atm" />
            </Form.Item>
            <Form.Item name="temperature" label="Temperature">
                <Input addonAfter="℃" />
            </Form.Item>
        </Form>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 10 }}>
            <Divider orientation="left">Correlations</Divider>
            <Form.Item name="density" label="Density">
                <div className={styles.combine}>
                    <Switch checkedChildren="on" unCheckedChildren="off" />
                    <Input addonAfter="g/cm^3" />
                </div>
            </Form.Item>
            <Form.Item name="viscosity" label="Viscosity">
                <div className={styles.combine}>
                    <Switch checkedChildren="on" unCheckedChildren="off" />
                    <Input addonAfter="g/cm-s" />
                </div>
            </Form.Item>
        </Form>
    </div>
);

export default EditWaterProps;
