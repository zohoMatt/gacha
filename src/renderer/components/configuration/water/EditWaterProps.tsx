import * as React from 'react';
import { Button, Divider, Form, Input, Popover, Popconfirm, Select, Switch } from 'antd';

const styles = require('./EditWaterProps.module.less');

const EditWaterProps: React.FunctionComponent = () => (
    <div className={styles.container}>
        <div className={styles.inputArea}>
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
                <Form.Item name="name" label="Name">
                    <Input disabled />
                </Form.Item>
                <Form.Item name="description" label="Description" wrapperCol={{ span: 16 }}>
                    <Input />
                </Form.Item>
                <Divider orientation="left">Basic</Divider>
                <Form.Item name="pressure" label="Pressure">
                    <Input addonAfter="atm" />
                </Form.Item>
                <Form.Item name="temperature" label="Temperature">
                    <Input addonAfter="℃" />
                </Form.Item>
            </Form>
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
                <Divider orientation="left">Correlations</Divider>
                <Form.Item name="density" label="Density">
                    <div className={styles.combine}>
                        <Switch checkedChildren="on" unCheckedChildren="off" />
                        <Input addonAfter="g/cm³" />
                    </div>
                </Form.Item>
                <Form.Item name="viscosity" label="Viscosity">
                    <div className={styles.combine}>
                        <Switch checkedChildren="on" unCheckedChildren="off" />
                        <Input addonAfter="g/cm·s" />
                    </div>
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
