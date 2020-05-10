import * as React from 'react';
import { Typography } from 'antd';

export const WeakTitle: React.FunctionComponent<{ title: string }> = ({ title }) => (
    <Typography.Paragraph strong>{title}</Typography.Paragraph>
);
