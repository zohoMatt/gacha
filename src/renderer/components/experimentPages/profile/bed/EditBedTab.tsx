import * as React from 'react';
import { Divider, Form, Input } from 'antd';

import { BedInputParams } from '../../../../store/experiment.store';
import { FullRecordType } from '../../../../store/base';
import { AdsorbentParams } from '../../../../store/adsorbent.store';

export interface EditBedTabProps extends BedInputParams {
    adsorbents: FullRecordType<AdsorbentParams>;
}

export const EditBedTab: React.FunctionComponent<EditBedTabProps> = ({ adsorbents }) => {
    const NORMAL_RULES = [{ required: true }];

    return (
        <>
            <Form.Item
                name={['bed', 'length']}
                label="Bed Length"
                rules={NORMAL_RULES}
                normalize={v => (v ? +v : '')}>
                <Input type="number" addonAfter="cm" />
            </Form.Item>
            <Form.Item
                name={['bed', 'diameter']}
                label="Bed Diameter"
                rules={NORMAL_RULES}
                normalize={v => (v ? +v : '')}>
                <Input type="number" addonAfter="cm" />
            </Form.Item>
            <Form.Item
                name={['bed', 'mass']}
                label="Bed Mass"
                rules={NORMAL_RULES}
                normalize={v => (v ? +v : '')}>
                <Input type="number" addonAfter="g" />
            </Form.Item>
            <Form.Item
                name={['bed', 'flowrate']}
                label="Flowrate"
                rules={[...NORMAL_RULES, { min: 0, type: 'number' }]}
                normalize={v => (v ? +v : '')}>
                <Input type="number" addonAfter="mL/min" />
            </Form.Item>
            {/* fixme EBCT is dependent on volume and flowrate */}
            <Form.Item
                name={['bed', 'ebct']}
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
