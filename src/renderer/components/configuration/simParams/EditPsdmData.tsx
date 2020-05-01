import * as React from 'react';
import { Divider, Form, Input } from 'antd';
import { EditProps } from '../../container/TableWithEditSection';

const styles = require('./EditPsdmData.module.less');

export const EditPsdmData: React.FunctionComponent<EditProps> = ({
    form,
    initValues,
    onValuesChange
}) => {
    const { temperature } = initValues;
    const NORMAL_RULES = [{ required: true, message: 'Value cannot be empty.' }];

    const POINTS_LIMIT = 500;
    const checkTotalPoints = (compareWith: string) => ({ getFieldValue }: any) => ({
        validator: (_: any, value: number) => {
            const message = `{Total Run Time}/{Time Step} should be less than ${POINTS_LIMIT}.`;
            if (value === 0) {
                return Promise.reject(message);
            }
            const result =
                compareWith === 'totalRunTime'
                    ? getFieldValue(compareWith) / value
                    : value / getFieldValue(compareWith);
            if (!Number.isNaN(result) && result <= POINTS_LIMIT) {
                return Promise.resolve();
            }
            return Promise.reject(message);
        }
    });

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
                    <Divider orientation="left" />
                    <Form.Item
                        name="totalRunTime"
                        label="Total Run Time"
                        rules={[...NORMAL_RULES, checkTotalPoints('timeStep')]}
                        normalize={v => (v ? +v : '')}>
                        <Input type="number" addonAfter="d" />
                    </Form.Item>
                    <Form.Item
                        name="firstPointDisplayed"
                        label="First Point Displayed"
                        rules={NORMAL_RULES}
                        normalize={v => (v ? +v : '')}>
                        <Input type="number" addonAfter="d" />
                    </Form.Item>
                    <Form.Item
                        name="timeStep"
                        label="Time Step"
                        rules={[...NORMAL_RULES, checkTotalPoints('totalRunTime')]}
                        normalize={v => (v ? +v : '')}>
                        <Input type="number" addonAfter="d" />
                    </Form.Item>
                    <Form.Item
                        name="numOfAxialElms"
                        label="Number of Axial Elements"
                        rules={[...NORMAL_RULES, { min: 1, type: 'number' }]}
                        normalize={v => (v ? +v : '')}>
                        <Input type="number" />
                    </Form.Item>
                    <Divider orientation="left">Number of Collocation Points</Divider>
                    <Form.Item
                        name="axialCollocatPts"
                        label="Axial Direction"
                        rules={[...NORMAL_RULES, { min: 1, type: 'number' }]}
                        normalize={v => (v ? +v : '')}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="radialCollocatPts"
                        label="Radial Direction"
                        rules={[...NORMAL_RULES, { min: 1, type: 'number' }]}
                        normalize={v => (v ? +v : '')}>
                        <Input type="number" />
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
