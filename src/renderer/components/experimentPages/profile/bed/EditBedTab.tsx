import * as React from 'react';
import { Divider, Form, Input, Select } from 'antd';

import { BedInputParams } from '../../../../store/experiment.store';
import { FullRecordType } from '../../../../store/base';
import { AdsorbentParams } from '../../../../store/adsorbent.store';

// fixme This component use global store directly. Not a good practice.
// However, the usage of this store is for READONLY without side effects.
// So no worries but better refactor it.
import { Store } from '../../../../store/init';

export interface EditBedTabProps extends BedInputParams {
    adsorbents: FullRecordType<AdsorbentParams>;
}

export const EditBedTab: React.FunctionComponent<EditBedTabProps> = ({ adsorbents }) => {
    const REQUIRED = [{ required: true }];

    const { Option } = Select;
    const options = Store.root.adsorbent.database.props.map(
        (ads: FullRecordType<AdsorbentParams>) => (
            <Option key={ads.key} value={ads.key}>
                {ads.name}
            </Option>
        )
    );

    return (
        <>
            <Form.Item name={['bed', 'adsorbent']} label="Adsorbent" rules={REQUIRED}>
                <Select>{options}</Select>
            </Form.Item>
            <Form.Item
                name={['bed', 'length']}
                label="Bed Length"
                rules={REQUIRED}
                normalize={v => (v ? +v : '')}>
                <Input type="number" addonAfter="cm" />
            </Form.Item>
            <Form.Item
                name={['bed', 'diameter']}
                label="Bed Diameter"
                rules={REQUIRED}
                normalize={v => (v ? +v : '')}>
                <Input type="number" addonAfter="cm" />
            </Form.Item>
            <Form.Item
                name={['bed', 'mass']}
                label="Bed Mass"
                rules={REQUIRED}
                normalize={v => (v ? +v : '')}>
                <Input type="number" addonAfter="g" />
            </Form.Item>
            <Form.Item
                name={['bed', 'flowrate']}
                label="Flowrate"
                rules={[...REQUIRED, { min: 0, type: 'number' }]}
                normalize={v => (v ? +v : '')}>
                <Input type="number" addonAfter="mL/min" />
            </Form.Item>
            {/* fixme EBCT is dependent on volume and flowrate */}
            <Form.Item
                name={['bed', 'ebct']}
                label="EBCT"
                rules={[...REQUIRED, { min: 0, type: 'number' }]}
                normalize={v => (v ? +v : '')}>
                <Input type="number" addonAfter="min" />
            </Form.Item>
            <Divider orientation="left">Calculation</Divider>
            {/* todo hlr, ebct */}
        </>
    );
};
