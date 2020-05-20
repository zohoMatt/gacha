import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Divider, Form, Input, Select } from 'antd';

import { FullRecordType } from '../../../../store/base';
import { AdsorbentParams } from '../../../../store/adsorbent.store';
import { Store, StoreInjectedProp } from '../../../../store/init';

export const EditBedTab: React.FunctionComponent<StoreInjectedProp> = inject('store')(
    observer(({ store }) => {
        const REQUIRED = [{ required: true }];

        const { Option } = Select;
        const options = store!.adsorbent.tableList.map((ads: FullRecordType<AdsorbentParams>) => (
            <Option key={ads.key} value={ads.key}>
                {ads.name}
            </Option>
        ));

        return (
            <>
                <Form.Item name={['bed', 'adsorbent']} label="Adsorbent" rules={REQUIRED}>
                    <Select
                        showSearch
                        placeholder="Select an adsorbent"
                        optionFilterProp="children"
                        filterOption={(input: string, option: any) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                        {options}
                    </Select>
                </Form.Item>
                <Form.Item
                    name={['bed', 'length', 'value']}
                    label="Bed Length"
                    rules={REQUIRED}
                    normalize={v => (v ? +v : '')}>
                    <Input type="number" addonAfter="cm" />
                </Form.Item>
                <Form.Item
                    name={['bed', 'diameter', 'value']}
                    label="Bed Diameter"
                    rules={REQUIRED}
                    normalize={v => (v ? +v : '')}>
                    <Input type="number" addonAfter="cm" />
                </Form.Item>
                <Form.Item
                    name={['bed', 'mass', 'value']}
                    label="Bed Mass"
                    rules={REQUIRED}
                    normalize={v => (v ? +v : '')}>
                    <Input type="number" addonAfter="g" />
                </Form.Item>
                <Form.Item
                    name={['bed', 'flowrate', 'value']}
                    label="Flowrate"
                    rules={[...REQUIRED, { min: 0, type: 'number' }]}
                    normalize={v => (v ? +v : '')}>
                    <Input type="number" addonAfter="mL/min" />
                </Form.Item>
                {/* fixme EBCT is dependent on volume and flowrate */}
                <Form.Item
                    name={['bed', 'ebct', 'value']}
                    label="EBCT"
                    rules={[...REQUIRED, { min: 0, type: 'number' }]}
                    normalize={v => (v ? +v : '')}>
                    <Input type="number" addonAfter="min" />
                </Form.Item>
                <Divider orientation="left">Calculation</Divider>
                {/* todo hlr, ebct */}
            </>
        );
    })
);
