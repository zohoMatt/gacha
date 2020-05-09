import * as React from 'react';
import { Divider, Form, Input } from 'antd';

import { CorrelationOrUserInput } from '../../../common/elements/CorrelationOrUserInput';
import { AdsorptionParams } from '../../../../store/adsorption.store';

export const EditAdsorptionTab: React.FunctionComponent<AdsorptionParams> = () => {
    return (
        <>
            <Divider orientation="left">Kinetics</Divider>
            <Form.Item name={['adsorption', 'kinetics', 'filmDiffusion']} label="Film Diffusion">
                <CorrelationOrUserInput
                    decorationText="Correlation"
                    tooltip="Gnielinski Correlation"
                    unit="cm/s"
                    />
            </Form.Item>
            <Form.Item
                name={['adsorption', 'kinetics', 'surfaceDiffusion']}
                label="Surface Diffusion">
                <CorrelationOrUserInput
                    decorationText="Correlation"
                    tooltip="Sontheimer Correlation"
                    unit="cm²/s"
                    />
            </Form.Item>
            <Form.Item name={['adsorption', 'kinetics', 'poreDiffusion']} label="Pore Diffusion">
                <CorrelationOrUserInput
                    decorationText="Correlation"
                    tooltip="Hayduk and Laudie"
                    unit="cm²/s"
                    />
            </Form.Item>
            <Divider orientation="left">Freundlich</Divider>
            <Form.Item name={['adsorption', 'freundlich', 'k']} label="K" normalize={v => +v}>
                <Input type="number" />
            </Form.Item>
            <Form.Item name={['adsorption', 'freundlich', 'nth']} label="1/n" normalize={v => +v}>
                <Input type="number" />
            </Form.Item>
        </>
    );
};
