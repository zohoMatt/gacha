import * as React from 'react';
import { Col, Form, Input, Row, Tabs } from 'antd';
import { EditProps } from '../../container/TableWithEditSection';
import { VALIDATE_MSG_TEMPLATE } from '../../../../utils/validator';
import { BasicInfoFormFields } from '../common/BasicInfo';

const styles = require('./EditContaminantProps.module.less');

export const EditContaminantProps: React.FunctionComponent<EditProps> = ({
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
            <Tabs defaultActiveKey="basic" onChange={() => null}>
                <Tabs.TabPane tab="Contaminant" key="basic">
                    <Row>
                        <Col span={12}>
                            <BasicInfoFormFields />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                name={['contaminant', 'molecularWeight']}
                                label="Molecular Weight"
                                rules={[]}
                                normalize={v => (v ? +v : '')}>
                                <Input type="number" addonAfter="mg/mmol" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name={['contaminant', 'molarVolume']}
                                label="Molar Volume @ NBP"
                                rules={[]}
                                normalize={v => (v ? +v : '')}>
                                <Input type="number" addonAfter="mL/gmol" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                name={['contaminant', 'boilingPt']}
                                label="Boiling Point"
                                rules={[]}
                                normalize={v => (v ? +v : '')}>
                                <Input type="number" addonAfter="℃" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name={['contaminant', 'initConcent']}
                                label="Initial Concentration"
                                rules={[]}
                                normalize={v => (v ? +v : '')}>
                                <Input type="number" addonAfter="mg/L" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                name={['contaminant', 'liquidDensity']}
                                label="Liquid Density"
                                rules={[]}
                                normalize={v => (v ? +v : '')}>
                                <Input type="number" addonAfter="g/mL" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name={['contaminant', 'solubility']}
                                label="Solubility"
                                rules={[]}
                                normalize={v => (v ? +v : '')}>
                                <Input type="number" addonAfter="mg/L" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                name={['contaminant', 'vaporPressure']}
                                label="Vapor Pressure"
                                rules={[]}
                                normalize={v => (v ? +v : '')}>
                                <Input type="number" addonAfter="Pa" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name={['contaminant', 'refractive']}
                                label="Refractive Index"
                                rules={[]}
                                normalize={v => (v ? +v : '')}>
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                name={['contaminant', 'cas']}
                                label="CAS Number"
                                rules={[]}
                                normalize={v => (v ? +v : '')}>
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Kinetics" key="kinetics"></Tabs.TabPane>
                <Tabs.TabPane tab="Freundlich" key="f-model">
                    <Row>
                        <Col span={16}>
                            <Form.Item
                                name={['freundlich', 'k']}
                                label="K"
                                rules={[]}
                                normalize={v => (v ? +v : '')}>
                                <Input type="number" addonAfter="(mg/g)*(L/mg)^(1/n)" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16}>
                            <Form.Item
                                name={['freundlich', 'nth']}
                                label="1/n"
                                rules={[]}
                                normalize={v => (v ? +v : '')}>
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Tabs.TabPane>
            </Tabs>
        </Form>
    );
};
