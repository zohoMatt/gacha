import * as React from 'react';
import { Button, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { shell } from 'electron';
import {
    ArrowRightOutlined,
    ExportOutlined,
    ImportOutlined,
    GithubOutlined,
    MailOutlined
} from '@ant-design/icons';

const styles = require('./WelcomePage.module.less');

export interface WelcomeProps {
    title?: string;
    intro?: string;
    copyright?: string;
    img: string;
    goto: string;
    repo?: string;
    mail?: string;
}

const WelcomePage: React.FunctionComponent<WelcomeProps> = ({
    title,
    intro,
    copyright,
    img,
    goto,
    repo,
    mail
}) => {
    const repoClicked = () => (repo ? shell.openExternal(repo) : null);

    return (
        <div className={styles.bg}>
            <img className={styles.img} src={img} alt="Header" />
            <div className={styles.buttonGroup}>
                <Row gutter={24}>
                    <Col span={12} offset={6}>
                        <Link to={goto} style={{ width: '100%' }}>
                            <Button block type="primary" size="large" icon={<ArrowRightOutlined />}>
                                START
                            </Button>
                        </Link>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col offset={3} span={8}>
                        <Button
                            ghost
                            block
                            type="primary"
                            size="middle"
                            shape="round"
                            icon={<ImportOutlined />}>
                            Import Data
                        </Button>
                    </Col>
                    <Col offset={2} span={8}>
                        <Button
                            ghost
                            block
                            type="primary"
                            size="middle"
                            shape="round"
                            icon={<ExportOutlined />}>
                            Export Data
                        </Button>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col offset={3} span={8}>
                        {repo ? (
                            <Button
                                ghost
                                block
                                type="dashed"
                                size="middle"
                                shape="round"
                                onClick={repoClicked}
                                icon={<GithubOutlined />}>
                                GitHub Repo
                            </Button>
                        ) : null}
                    </Col>
                    <Col offset={2} span={8}>
                        {mail ? (
                            <Button
                                ghost
                                block
                                type="dashed"
                                size="middle"
                                shape="round"
                                href={`mailto:${mail}`}
                                icon={<MailOutlined />}>
                                Contact Me
                            </Button>
                        ) : null}
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default WelcomePage;
