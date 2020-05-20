import * as React from 'react';
import { Form, Divider } from 'antd';

import { BriefRecordType } from '../../../store/base';
import { ViewBasicInfo } from '../../common/BasicInfo';
import { Calculation } from '../../../../mods/calculation/basic';
import { ContaminantParams } from '../../../../utils/storage/types';

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

    const d = Calculation.display;

    return (
        <Form size="small" layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 8 }}>
            <ViewBasicInfo name={name} description={description} />
            <Divider orientation="left">Properties</Divider>
            <Form.Item label="Full Name">
                <span>{fullName}</span>
            </Form.Item>
            <Form.Item label="Molecular Weight">
                <span>{d(molecularWeight)}</span>
            </Form.Item>
            <Form.Item label="MolarVolume @ NBP">
                <span>{d(molarVolume)}</span>
            </Form.Item>
            <Form.Item label="Boiling Point">
                <span>{d(boilingPt)}</span>
            </Form.Item>
            <Form.Item label="Liquid Density">
                <span>{d(liquidDensity)}</span>
            </Form.Item>
            <Form.Item label="Solubility">
                <span>{d(solubility)}</span>
            </Form.Item>
            <Form.Item label="Vapor Pressure">
                <span>{d(vaporPressure)}</span>
            </Form.Item>

            <Form.Item label="Refractive Index">
                <span>{d(refractive)}</span>
            </Form.Item>
            <Form.Item label="CAS Number">
                <span>{cas}</span>
            </Form.Item>
        </Form>
    );
};
