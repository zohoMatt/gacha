import * as React from 'react';
import { AutoComplete, Col, Divider, Form, Input, Row } from 'antd';

import { BasicInfoFormFields } from '../../common/BasicInfo';
import { EditProps } from '../../../container/TableWithEditSection';
import { VALIDATE_MSG_TEMPLATE } from '../../../../../utils/validator';

const styles = require('./EditAdsorbentData.module.less');

export const EditAdsorbentData: React.FunctionComponent<EditProps> = ({
    form,
    initValues,
    onValuesChange
}) => {
    const NORMAL_RULES = [{ required: true }];

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <Row>
                    <Col span={24}>
                        <Form
                            size="small"
                            layout="horizontal"
                            validateMessages={VALIDATE_MSG_TEMPLATE}
                            ref={form}
                            hideRequiredMark={true}
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 8 }}
                            onValuesChange={(s, all: any) => onValuesChange(all)}
                            initialValues={initValues}>
                            <BasicInfoFormFields manufacturer={true} />
                            <Divider orientation="left" />
                            <Form.Item
                                name="density"
                                label="Apparent Density"
                                rules={NORMAL_RULES}
                                normalize={v => (v ? +v : '')}>
                                <Input type="number" addonAfter="g/cm³" />
                            </Form.Item>
                            <Form.Item
                                name="particleRadius"
                                label="Particle Radius"
                                rules={NORMAL_RULES}
                                normalize={v => (v ? +v : '')}>
                                <Input type="number" addonAfter="cm" />
                            </Form.Item>
                            <Form.Item
                                name="particlePorosity"
                                label="Particle Porosity"
                                rules={NORMAL_RULES}
                                normalize={v => (v ? +v : '')}>
                                <Input type="number" />
                            </Form.Item>
                            <Form.Item
                                name="adsorbentType"
                                label="Adsorbent Type"
                                rules={NORMAL_RULES}
                                normalize={v => (v ? +v : '')}>
                                <Input type="string" />
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
