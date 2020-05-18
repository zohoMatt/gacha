import * as React from 'react';
import { Form, Divider, Input } from 'antd';

import { BriefRecordType } from '../../../store/base';
import { ContaminantParams } from '../../../store/contaminant.store';
import { ViewBasicInfo } from '../../common/BasicInfo';

export interface ViewContaminantDataProps {
    data: BriefRecordType<ContaminantParams>;
}

export const ViewContaminantData: React.FunctionComponent<ViewContaminantDataProps> = ({
    data
}) => {
    const {
        name,
        description,
        fullName,
        molecularWeight,
        molarVolume,
        boilingPt,
        liquidDensity,
        solubility,
        vaporPressure,
        refractive,
        cas
    } = data;

    return (
        <Form size="small" layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 8 }}>
            <ViewBasicInfo name={name} description={description} />
            <Divider orientation="left">Properties</Divider>
            <Form.Item label="Full Name">
                <span>{fullName}</span>
            </Form.Item>
            <Form.Item label="Molecular Weight">
                <span>{molecularWeight} mg/mol</span>
            </Form.Item>
            <Form.Item label="MolarVolume @ NBP">
                <span>{molarVolume} mg/gmol</span>
            </Form.Item>
            <Form.Item label="Boiling Point">
                <span>{boilingPt} ℃</span>
            </Form.Item>
            <Form.Item label="Liquid Density">
                <span>{liquidDensity} g/mL</span>
            </Form.Item>
            <Form.Item label="Solubility">
                <span>{solubility} mg/L</span>
            </Form.Item>
            <Form.Item label="Vapor Pressure">
                <span>{vaporPressure} Pa</span>
            </Form.Item>

            <Form.Item label="Refractive Index">
                <span>{refractive}</span>
            </Form.Item>
            <Form.Item label="CAS Number">
                <span>{cas}</span>
            </Form.Item>
        </Form>
    );
};
