import * as React from 'react';
import { Divider, Form, Input } from 'antd';

import { BedInputParams } from '../../../../store/experiment.store';

export const EditBedTab: React.FunctionComponent<BedInputParams> = initValues => {
    const NORMAL_RULES = [{ required: true }];

    return (
        <>
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
        </>
    );
};
