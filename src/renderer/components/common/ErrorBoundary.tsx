import * as React from 'react';
import { Typography } from 'antd';

export interface ErrorBoundaryState {
    error: boolean;
}

export interface ErrorBoundaryProps {
    display: string;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    public state: ErrorBoundaryState = {
        error: false
    };

    public static getDerivedStateFromError() {
        return { error: true };
    }

    public render() {
        if (this.state.error) {
            return (
                <Typography.Text type="danger" strong>
                    {this.props.display}
                </Typography.Text>
            );
        }

        return this.props.children;
    }
}
