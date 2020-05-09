import * as React from 'react';
import { Divider, Form, Input } from 'antd';

import { EditProps } from '../../../container/TableWithEditSection';
import { VALIDATE_MSG_TEMPLATE } from '../../../../../utils/validator';
import { CorrelationOrUserInput } from '../../../common/CorrelationOrUserInput';
import { BasicInfoFormFields } from '../../common/BasicInfo';

export const EditAdsorptionData: React.FunctionComponent<EditProps> = ({
    form,
    initValues,
    onValuesChange
}) => {
    return (
        <Form
            size="small"
            layout="horizontal"
            validateMessages={VALIDATE_MSG_TEMPLATE}
            ref={form}
            hideRequiredMark={true}
            labelCol={{ span: 11 }}
            wrapperCol={{ span: 13 }}
            onValuesChange={(s, all: any) => onValuesChange(all)}
            initialValues={initValues}>
            <BasicInfoFormFields />
            <Divider orientation="left">Kinetics</Divider>
            <Form.Item name={['kinetics', 'filmDiffusion']} label="Film Diffusion">
                <CorrelationOrUserInput
                    decorationText="Correlation"
                    tooltip="Gnielinski Correlation"
                    unit="cm/s"
                    />
            </Form.Item>
            <Form.Item name={['kinetics', 'surfaceDiffusion']} label="Surface Diffusion">
                <CorrelationOrUserInput
                    decorationText="Correlation"
                    tooltip="Sontheimer Correlation"
                    unit="cm²/s"
                    />
            </Form.Item>
            <Form.Item name={['kinetics', 'poreDiffusion']} label="Pore Diffusion">
                <CorrelationOrUserInput
                    decorationText="Correlation"
                    tooltip="Hayduk and Laudie"
                    unit="cm²/s"
                    />
            </Form.Item>
            <Divider orientation="left">Freundlich</Divider>
            <Form.Item name={['freundlich', 'k']} label="K" normalize={v => +v}>
                <Input type="number" />
            </Form.Item>
            <Form.Item name={['freundlich', 'nth']} label="1/n" normalize={v => +v}>
                <Input type="number" />
            </Form.Item>
        </Form>
    );
};
