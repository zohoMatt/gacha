import * as React from 'react';
import { Divider, Form, Input } from 'antd';

import { EditProps } from '../../container/TableWithEditSection';
import { PsdmSimParamsValidators } from '../../../../utils/validators/psdmSimParams.valid';
import { ValidLevels } from '../../../../utils/validators/types';
import { Rule } from '../../../../utils/validators/common';

const styles = require('./EditPsdmData.module.less');

export const EditPsdmData: React.FunctionComponent<EditProps> = ({
    form,
    initValues,
    onValuesChange
}) => {
    const NORMAL_RULES = [{ required: true }];

    const checkTotalPoints = ({ getFieldValue }: any) => ({
        validator: () => {
            const totalRunTime = getFieldValue('totalRunTime');
            const firstPointDisplayed = getFieldValue('firstPointDisplayed');
            const timeStep = getFieldValue('timeStep');
            const valid = PsdmSimParamsValidators.totalRunTime(
                {
                    totalRunTime,
                    firstPointDisplayed,
                    timeStep
                } as any,
                '',
                []
            );
            if (valid.valid === ValidLevels.Valid) {
                return Promise.resolve();
            }
            return Promise.reject(valid.message);
        }
    });

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <Form
                    size="small"
                    layout="horizontal"
                    validateMessages={Rule.FORM_WARNING_PROMPT}
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
                        rules={[{ max: 80, type: 'string' }]}>
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Divider orientation="left" />
                    <Form.Item
                        name="totalRunTime"
                        label="Total Run Time"
                        rules={[...NORMAL_RULES, checkTotalPoints]}
                        normalize={v => (v ? +v : '')}>
                        <Input type="number" addonAfter="d" />
                    </Form.Item>
                    <Form.Item
                        name="firstPointDisplayed"
                        label="First Point Displayed"
                        rules={[...NORMAL_RULES, checkTotalPoints]}
                        normalize={v => (v ? +v : '')}>
                        <Input type="number" addonAfter="d" />
                    </Form.Item>
                    <Form.Item
                        name="timeStep"
                        label="Time Step"
                        rules={[...NORMAL_RULES, checkTotalPoints]}
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
