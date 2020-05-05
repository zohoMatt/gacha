import * as React from 'react';
import { Col, Divider, Form, Row } from 'antd';

import { BriefRecordType } from '../../../../store/types';
import { BedParams } from '../../../../store/bed.store';
import { Calculation } from '../../../../../mods/calculation/basic';
import { FixedBed } from '../../../../../mods/calculation/bedProps.maths';

export interface ViewBedPropsComponentProps {
    data: BriefRecordType<BedParams>;
}

export const ViewBedProps: React.FunctionComponent<ViewBedPropsComponentProps> = ({ data }) => {
    const { name, description, manufacturer, length, diameter, mass, flowrate, ebct } = data;
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
            <Row>
                <Col span={11} offset={2}>
                    <Form.Item label="Bed Length">
                        <span>{`${length} cm`}</span>
                    </Form.Item>
                </Col>
                <Col span={11}>
                    <Form.Item label="Bed Length">
                        <span>{`${length} cm`}</span>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={11} offset={2}>
                    <Form.Item label="Mass">
                        <span>{`${mass} g`}</span>
                    </Form.Item>
                </Col>
                <Col span={11}>
                    <Form.Item label="Flowrate">
                        <span>{`${flowrate} mL/min`}</span>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={11} offset={2}>
                    <Form.Item label="EBCT">
                        <span>{`${ebct} min`}</span>
                    </Form.Item>
                </Col>
            </Row>
            <Divider orientation="left">Calculation</Divider>
            <Row>
                <Col span={11} offset={2}>
                    <Form.Item label="Bed Density">
                        <span>{Calculation.display(FixedBed.density(mass, length, diameter))}</span>
                    </Form.Item>
                </Col>
                <Col span={11}>
                    <Form.Item label="Bed Porosity">
                        <span>{`${0}`}</span>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={11} offset={2}>
                    <Form.Item label="Cross-Sectional Area">
                        <span>{Calculation.display(FixedBed.crossSectionalArea(diameter))}</span>
                    </Form.Item>
                </Col>
                <Col span={11}>
                    <Form.Item label="Bed Volume">
                        <span>{Calculation.display(FixedBed.volume(length, diameter))}</span>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={11} offset={2}>
                    <Form.Item label="Superficial Velocity">
                        <span>{`${ebct} m/h`}</span>
                    </Form.Item>
                </Col>
                <Col span={11}>
                    <Form.Item label="Interstitial Velocity">
                        <span>{`${ebct} m/h`}</span>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};
