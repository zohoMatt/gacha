import * as React from 'react';
import { Form, Row, Col, Divider } from 'antd';

import { BriefRecordType } from '../../../../store/types';
import { ContaminantParams } from '../../../../store/contaminant.store';
import { ViewBasicInfo } from '../../common/BasicInfo';

export interface ViewContaminantDataProps {
    data: BriefRecordType<ContaminantParams>;
}

export const ViewContaminantData: React.FunctionComponent<ViewContaminantDataProps> = ({
    data
}) => {
    const { name, description, contaminant, freundlich, kinetics } = data;
    const {
        molecularWeight,
        molarVolume,
        boilingPt,
        initConcent,
        liquidDensity,
        solubility,
        vaporPressure,
        refractive,
        cas
    } = contaminant;
    const { filmDiffusion, surfaceDiffusion, poreDiffusion, spdfr, tortuosity } = kinetics;

    const generateLine = (entries: { label: string; value: any; unit?: string }[]) =>
        entries.map(({ label, value, unit }) => (
            <Col span={12} key={label}>
                <Form.Item label={label}>
                    <span>{value}</span>
                    {unit ? <span>{` ${unit}`}</span> : null}
                </Form.Item>
            </Col>
        ));

    return (
        <Form size="small" layout="horizontal" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
            <ViewBasicInfo name={name} description={description} />
            <Divider orientation="left">Contaminant</Divider>
            <Row>
                {generateLine([
                    { label: 'Molecular Weight', value: molecularWeight, unit: 'mg/mmol' },
                    { label: 'MolarVolume @ NBP', value: molarVolume, unit: 'mg/gmol' }
                ])}
            </Row>
            <Row>
                {generateLine([
                    { label: 'Boiling Point', value: boilingPt, unit: '℃' },
                    { label: 'Initial Concentration', value: initConcent, unit: 'mg/L' }
                ])}
            </Row>
            <Row>
                {generateLine([
                    { label: 'Liquid Density', value: liquidDensity, unit: 'g/mL' },
                    { label: 'Solubility', value: solubility, unit: 'mg/L' }
                ])}
            </Row>
            <Row>
                {generateLine([{ label: 'Vapor Pressure', value: vaporPressure, unit: 'Pa' }])}
            </Row>
            <Row>
                {generateLine([
                    { label: 'Refractive Index', value: refractive },
                    { label: 'CAS Number', value: cas }
                ])}
            </Row>
            <Divider orientation="left">Kinetics</Divider>
            <Row>
                {generateLine([
                    {
                        label: 'Film Diffusion',
                        value: 200,
                        unit: filmDiffusion.correlation ? 'cm/s (Gnielinski)' : 'cm/s (User Input)'
                    },
                    {
                        label: 'Surface Diffusion',
                        value: 200,
                        unit: surfaceDiffusion.correlation
                            ? 'cm²/s (Sontheimer)'
                            : 'cm² (User Input)'
                    }
                ])}
            </Row>
            <Row>
                {generateLine([
                    {
                        label: 'Pore Diffusion',
                        value: 200,
                        unit: poreDiffusion.correlation
                            ? 'cm²/s  (Hayduk & Laudie)'
                            : 'cm²/s (User Input)'
                    }
                ])}
            </Row>
            <Row>
                {generateLine([
                    { label: 'SPDFR', value: 20 },
                    { label: 'Tortuosity', value: 20 }
                ])}
            </Row>
            <Divider orientation="left">Freudlich</Divider>
            <Row>
                {generateLine([
                    { label: 'K', value: 98, unit: '(mg/g)*(L/mg)^(1/n)' },
                    { label: 'Tortuosity', value: 20 }
                ])}
            </Row>
        </Form>
    );
};
