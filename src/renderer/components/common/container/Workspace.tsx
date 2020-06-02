import * as React from 'react';
import { Typography } from 'antd';

const styles = require('./Workspace.module.less');

export interface WorkspaceProps {
    title: string;
}

export const Workspace: React.FC<WorkspaceProps> = ({ children, title }) => (
    <div className={styles.container}>
        <Typography.Title className={styles.title} level={3}>
            {title}
        </Typography.Title>
        {children}
    </div>
);
