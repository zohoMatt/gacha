import * as React from 'react';
import { Divider, Form, Input } from 'antd';

import { PsdmValidator } from '../../../../../mods/validators/psdm.validator';
import { PsdmInputParams } from '../../../../store/experiment.store';

export const EditPsdmTab: React.FunctionComponent<PsdmInputParams> = () => {
    const vdator = new PsdmValidator();
    const POINTS = 500;

    return (
        <>
            <Form.Item
                name="totalRunTime"
                label="Total Run Time"
                rules={vdator.getFormValidators('totalRunTime', POINTS)}
                normalize={v => (v ? +v : '')}>
                <Input type="number" addonAfter="d" />
            </Form.Item>
            <Form.Item
                name="firstPointDisplayed"
                label="First Point Displayed"
                rules={vdator.getFormValidators('firstPointDisplayed', POINTS)}
                normalize={v => (v ? +v : '')}>
                <Input type="number" addonAfter="d" />
            </Form.Item>
            <Form.Item
                name="timeStep"
                label="Time Step"
                rules={vdator.getFormValidators('timeStep', POINTS)}
                normalize={v => (v ? +v : '')}>
                <Input type="number" addonAfter="d" />
            </Form.Item>
            <Form.Item
                name="numOfAxialElms"
                label="Number of Axial Elements"
                rules={vdator.getFormValidators('numOfAxialElms')}
                normalize={v => (v ? +v : '')}>
                <Input type="number" />
            </Form.Item>
            <Divider orientation="left">Number of Collocation Points</Divider>
            <Form.Item
                name="axialCollocatPts"
                label="Axial Direction"
                rules={vdator.getFormValidators('axialCollocatPts')}
                normalize={v => (v ? +v : '')}>
                <Input type="number" />
            </Form.Item>
            <Form.Item
                name="radialCollocatPts"
                label="Radial Direction"
                rules={vdator.getFormValidators('radialCollocatPts')}
                normalize={v => (v ? +v : '')}>
                <Input type="number" />
            </Form.Item>
        </>
    );
};
