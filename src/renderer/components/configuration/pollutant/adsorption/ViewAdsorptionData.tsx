import * as React from 'react';
import { Form, Divider } from 'antd';

import { BriefRecordType } from '../../../../store/base';
import { ViewBasicInfo } from '../../common/BasicInfo';
import { AdsorptionParams } from '../../../../store/adsorption.store';

export interface ViewAdsorptionDataProps {
    data: BriefRecordType<AdsorptionParams>;
}

export const ViewAdsorptionData: React.FunctionComponent<ViewAdsorptionDataProps> = ({ data }) => {
    const { name, description, kinetics, freundlich } = data;

    const { filmDiffusion, poreDiffusion, surfaceDiffusion, spdfr, tortuosity } = kinetics;
    const { k, nth } = freundlich;

    return (
        <Form size="small" layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 8 }}>
            <ViewBasicInfo name={name} description={description} />
            <Divider orientation="left">Properties</Divider>
            <Form.Item label="Film Diffusion">
                <span>
                    {`${200  } ${  filmDiffusion.correlation}`
                        ? 'cm/s (Gnielinski)'
                        : 'cm/s (User Input)'}
                </span>
            </Form.Item>
            <Form.Item label="Surface Diffusion">
                <span>
                    {`${200  } ${  surfaceDiffusion.correlation}`
                        ? 'cm²/s (Sontheimer)'
                        : 'cm²/s (User Input)'}
                </span>
            </Form.Item>
            <Form.Item label="Pore Diffusion">
                <span>
                    {`${200  } ${  poreDiffusion.correlation}`
                        ? 'cm²/s (Hayduk & Laudie)'
                        : 'cm²/s (User Input)'}
                </span>
            </Form.Item>
            <Form.Item label="SPDFR">
                <span>{spdfr}</span>
            </Form.Item>
            <Form.Item label="Tortuosity">
                <span>{tortuosity}</span>
            </Form.Item>
            <Divider orientation="left">Freudlich</Divider>
            <Form.Item label="k">
                <span>{k} (mg/g)*(L/mg)^(1/n)</span>
            </Form.Item>
            <Form.Item label="1/n">
                <span>{nth}</span>
            </Form.Item>
        </Form>
    );
};
