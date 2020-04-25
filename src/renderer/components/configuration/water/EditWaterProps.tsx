import * as React from 'react';
import { Button, Divider, Form, Input, Popover, Popconfirm, Select, Switch, Row } from 'antd';

import { InputSwitcher } from '../../common/InputSwitcher';

const styles = require('./EditWaterProps.module.less');

const EditWaterProps: React.FunctionComponent = () => (
    <div className={styles.container}>
        <div className={styles.formContainer}>
            <Form labelCol={{ span: 6 }} wrapperCol={{ span: 8 }}>
                <Form.Item name="name" label="Name">
                    <Input disabled />
                </Form.Item>
                <Form.Item name="description" label="Description" wrapperCol={{ span: 12 }}>
                    <Input />
                </Form.Item>
                <Divider orientation="left">Basic</Divider>
                <Form.Item name="pressure" label="Pressure">
                    <Input addonAfter="atm" />
                </Form.Item>
                <Form.Item name="temperature" label="Temperature">
                    <Input addonAfter="℃" />
                </Form.Item>
                <Divider orientation="left">Correlations</Divider>
                <Form.Item name="density" label="Density">
                    <InputSwitcher unit="g/cm³" />
                </Form.Item>
                <Form.Item name="viscosity" label="Viscosity">
                    <InputSwitcher unit="g/cm·s" />
                </Form.Item>
            </Form>
        </div>
        <div className={styles.btnPanel}>
            <Button type="primary">Save</Button>
            <Popover
                content={
                    <div>
                        <Input />
                        <a>Confirm</a>
                        <a>Cancel</a>
                    </div>
                }
                title="Name of new parameter group"
                trigger="click">
                <Button type="primary">Save as</Button>
            </Popover>
            <Popconfirm
                placement="top"
                title="Discard changes?"
                onConfirm={() => null}
                okText="Yes"
                cancelText="No">
                <Button type="danger" ghost>
                    Cancel
                </Button>
            </Popconfirm>
        </div>
    </div>
);

export default EditWaterProps;
