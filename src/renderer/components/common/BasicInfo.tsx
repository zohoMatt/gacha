import * as React from 'react';
import { Form, Input } from 'antd';

export interface BasicInfoFormProps {
    manufacturer?: boolean;
}

export const BasicInfoFormFields: React.FunctionComponent<BasicInfoFormProps> = ({
    manufacturer
}) => {
    const NORMAL_RULES = [{ required: true }];

    return (
        <>
            <Form.Item
                name="name"
                label="Name"
                rules={[...NORMAL_RULES, { max: 20, type: 'string' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ max: 80, type: 'string' }]}>
                <Input.TextArea rows={4} />
            </Form.Item>
            {manufacturer ? (
                <Form.Item
                    name="manufacturer"
                    label="Manufacturer"
                    rules={[{ max: 20, type: 'string' }]}>
                    <Input />
                </Form.Item>
            ) : null}
        </>
    );
};

export interface ViewBasicInfoProps {
    name: string;
    description: string;
    manufacturer?: string;
}

export const ViewBasicInfo: React.FunctionComponent<ViewBasicInfoProps> = ({
    name,
    description,
    manufacturer
}) => {
    return (
        <>
            <Form.Item label="Name">
                <span>{name}</span>
            </Form.Item>
            <Form.Item label="Description">
                <span>{description}</span>
            </Form.Item>
            {manufacturer ? (
                <Form.Item label="Manufacture">
                    <span>{manufacturer}</span>
                </Form.Item>
            ) : null}
        </>
    );
};
