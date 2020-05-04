import * as React from 'react';

import { Divider, Form } from 'antd';
import { BriefRecordType } from '../../../../store/types';
import { AdsorbentParams } from '../../../../store/adsorbent.store';

export interface ViewAdsorbentDataProps {
    data: BriefRecordType<AdsorbentParams>;
}

export const ViewAdsorbentData: React.FunctionComponent<ViewAdsorbentDataProps> = ({ data }) => {
    const {
        name,
        description,
        manufacturer,
        density,
        adsorbentType,
        particlePorosity,
        particleRadius
    } = data;

    return (
        <Form size="small" layout="horizontal" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
            <Form.Item label="Name">
                <span>{name}</span>
            </Form.Item>
            <Form.Item label="Description">
                <span>{description}</span>
            </Form.Item>
            <Form.Item label="Manufacture">
                <span>{manufacturer}</span>
            </Form.Item>
            <Divider orientation="left" />
            <Form.Item label="Apparent Density">
                <span>{`${density} g/cm³`}</span>
            </Form.Item>
            <Form.Item label="Particle Radius">
                <span>{`${particleRadius} cm`}</span>
            </Form.Item>
            <Form.Item label="Particle Porosity">
                <span>{`${particlePorosity}`}</span>
            </Form.Item>
            <Form.Item label="Adsorbent Type">
                <span>{`${adsorbentType}`}</span>
            </Form.Item>
        </Form>
    );
};
