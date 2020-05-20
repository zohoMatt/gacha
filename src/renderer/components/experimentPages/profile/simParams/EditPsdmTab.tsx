import * as React from 'react';
import { Divider, Form, Input } from 'antd';

import { PsdmValidator } from '../../../../../mods/validators/psdm.validator';
import { PsdmInputParams } from '../../../../store/expProfile.store';

export const EditPsdmTab: React.FunctionComponent<PsdmInputParams> = () => {
    const vdator = new PsdmValidator();
    const POINTS = 500;

    return (
        <>
            <Form.Item
                name={['psdm', 'totalRunTime', 'value']}
                label="Total Run Time"
                rules={vdator.getFormValidators('totalRunTime', POINTS)}
                normalize={v => (v ? +v : '')}>
                <Input type="number" addonAfter="d" />
            </Form.Item>
            <Form.Item
                name={['psdm', 'firstPointDisplayed', 'value']}
                label="First Point Displayed"
                rules={vdator.getFormValidators('firstPointDisplayed', POINTS)}
                normalize={v => (v ? +v : '')}>
                <Input type="number" addonAfter="d" />
            </Form.Item>
            <Form.Item
                name={['psdm', 'timeStep', 'value']}
                label="Time Step"
                rules={vdator.getFormValidators('timeStep', POINTS)}
                normalize={v => (v ? +v : '')}>
                <Input type="number" addonAfter="d" />
            </Form.Item>
            <Form.Item
                name={['psdm', 'numOfAxialElms']}
                label="Number of Axial Elements"
                rules={vdator.getFormValidators('numOfAxialElms')}
                normalize={v => (v ? +v : '')}>
                <Input type="number" />
            </Form.Item>
            <Divider orientation="left">Number of Collocation Points</Divider>
            <Form.Item
                name={['psdm', 'axialCollocatPts']}
                label="Axial Direction"
                rules={vdator.getFormValidators('axialCollocatPts')}
                normalize={v => (v ? +v : '')}>
                <Input type="number" />
            </Form.Item>
            <Form.Item
                name={['psdm', 'radialCollocatPts']}
                label="Radial Direction"
                rules={vdator.getFormValidators('radialCollocatPts')}
                normalize={v => (v ? +v : '')}>
                <Input type="number" />
            </Form.Item>
        </>
    );
};
