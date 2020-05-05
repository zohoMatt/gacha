import * as React from 'react';
import { Col, Divider, Form, Row } from 'antd';

import { ViewBasicInfo } from '../../common/BasicInfo';
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
        <Row>
            <Col span={24}>
                <Form
                    size="small"
                    layout="horizontal"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 8 }}>
                    <ViewBasicInfo
                        name={name}
                        description={description}
                        manufacturer={manufacturer}
                        />
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
            </Col>
        </Row>
    );
};
