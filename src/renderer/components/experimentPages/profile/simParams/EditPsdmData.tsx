import * as React from 'react';
import { Divider, Form, Input } from 'antd';

import { BasicInfoFormFields } from '../../../common/BasicInfo';
import { EditProps } from '../../../common/container/TableWithEditSection';
import { PsdmValidator } from '../../../../../mods/validators/psdm.validator';
import { VALIDATE_MSG_TEMPLATE } from '../../../../../utils/validator';

export const EditPsdmData: React.FunctionComponent<EditProps> = ({
    form,
    initValues,
    onValuesChange
}) => {
    const vdator = new PsdmValidator();
    const POINTS = 500;

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
            <BasicInfoFormFields />
            <Divider orientation="left" />
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
        </Form>
    );
};
