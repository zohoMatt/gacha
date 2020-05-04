import * as React from 'react';
import { Divider, Form, Input } from 'antd';

import { EditProps } from '../../../container/TableWithEditSection';
import { Rule } from '../../../../../utils/validators/common';

const styles = require('./EditBedData.module.less');

export const EditBedData: React.FunctionComponent<EditProps> = ({
    form,
    initValues,
    onValuesChange
}) => {
    const NORMAL_RULES = [{ required: true }];

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
                        name="length"
                        label="Bed Length"
                        rules={NORMAL_RULES}
                        normalize={v => (v ? +v : '')}>
                        <Input type="number" addonAfter="cm" />
                    </Form.Item>
                    <Form.Item
                        name="diameter"
                        label="Bed Diameter"
                        rules={NORMAL_RULES}
                        normalize={v => (v ? +v : '')}>
                        <Input type="number" addonAfter="cm" />
                    </Form.Item>
                    <Form.Item
                        name="mass"
                        label="Bed Mass"
                        rules={NORMAL_RULES}
                        normalize={v => (v ? +v : '')}>
                        <Input type="number" addonAfter="g" />
                    </Form.Item>
                    <Form.Item
                        name="flowrate"
                        label="Flowrate"
                        rules={[...NORMAL_RULES, { min: 0, type: 'number' }]}
                        normalize={v => (v ? +v : '')}>
                        <Input type="number" addonAfter="mL/min" />
                    </Form.Item>
                    <Form.Item
                        name="ebct"
                        label="EBCT"
                        rules={[...NORMAL_RULES, { min: 0, type: 'number' }]}
                        normalize={v => (v ? +v : '')}>
                        <Input type="number" addonAfter="min" />
                    </Form.Item>
                    <Divider orientation="left">Calculation</Divider>
                </Form>
            </div>
        </div>
    );
};
