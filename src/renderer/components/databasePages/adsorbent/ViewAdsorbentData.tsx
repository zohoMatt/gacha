import * as React from 'react';
import { Col, Divider, Form, Row } from 'antd';

import { ViewBasicInfo } from '../../common/BasicInfo';
import { BriefRecordType } from '../../../store/base';
import { Calculation } from '../../../../mods/calculation/basic';
import { AdsorbentParams } from '../../../../utils/storage/types';

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

    const d = Calculation.display;

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
                        <span>{`${d(density)}`}</span>
                    </Form.Item>
                    <Form.Item label="Particle Radius">
                        <span>{`${d(particleRadius)}`}</span>
                    </Form.Item>
                    <Form.Item label="Particle Porosity">
                        <span>{`${d(particlePorosity)}`}</span>
                    </Form.Item>
                    <Form.Item label="Adsorbent Type">
                        <span>{adsorbentType}</span>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};
