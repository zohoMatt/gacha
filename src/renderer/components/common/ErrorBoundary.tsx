import * as React from 'react';
import { Button, Result, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons/lib';

const styles = require('./ErrorBoundary.module.less');

export interface ErrorBoundaryState {
    error: boolean;
    errorContent: string;
    errorStackInfo: string;
}

export class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
    public state: ErrorBoundaryState = {
        error: false,
        errorContent: '',
        errorStackInfo: ''
    };

    public static getDerivedStateFromError() {
        return { error: true };
    }

    public componentDidCatch(error: Error, info: React.ErrorInfo) {
        this.setState({
            errorContent: error.toString(),
            errorStackInfo: info.componentStack
        });
    }

    public refresh = () => {
        window.location.reload();
    };

    public render() {
        const { Paragraph } = Typography;
        const { error, errorContent, errorStackInfo } = this.state;

        if (error) {
            return (
                <Result
                    status="500"
                    title="ERROR"
                    subTitle="Sorry, something went wrong."
                    extra={
                        <Button type="primary" onClick={this.refresh}>
                            Refresh
                        </Button>
                    }>
                    <div className={styles.errorDetails}>
                        <Paragraph>
                            <CloseCircleOutlined /> {errorContent}
                        </Paragraph>
                        <Paragraph>
                            <CloseCircleOutlined /> {errorStackInfo}
                        </Paragraph>
                    </div>
                </Result>
            );
        }

        return this.props.children;
    }
}
