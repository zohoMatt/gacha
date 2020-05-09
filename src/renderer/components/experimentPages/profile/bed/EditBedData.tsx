import * as React from 'react';
import { Divider, Form, Input } from 'antd';

import { BasicInfoFormFields } from '../../../common/BasicInfo';
import { EditProps } from '../../../common/container/TableWithEditSection';
import { VALIDATE_MSG_TEMPLATE } from '../../../../../utils/validator';

export const EditBedData: React.FunctionComponent<EditProps> = ({
    form,
    initValues,
    onValuesChange
}) => {
    const NORMAL_RULES = [{ required: true }];

    return (
        <Form
            size="small"
            layout="horizontal"
            validateMessages={VALIDATE_MSG_TEMPLATE}
            ref={form}
            hideRequiredMark={true}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 8 }}
            onValuesChange={(s, all: any) => onValuesChange(all)}
            initialValues={initValues}>
            <BasicInfoFormFields manufacturer={true} />
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
            {/* fixme EBCT is dependent on volume and flowrate */}
            <Form.Item
                name="ebct"
                label="EBCT"
                rules={[...NORMAL_RULES, { min: 0, type: 'number' }]}
                normalize={v => (v ? +v : '')}>
                <Input type="number" addonAfter="min" />
            </Form.Item>
            <Divider orientation="left">Calculation</Divider>
            {/* todo hlr, ebct */}
        </Form>
    );
};
