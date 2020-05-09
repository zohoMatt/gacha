import * as React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { Menu } from 'antd';
import { AreaChartOutlined, DatabaseOutlined, InsertRowBelowOutlined } from '@ant-design/icons';
import { ExperimentOutlined, SettingOutlined } from '@ant-design/icons/lib';

const styles = require('./NavBar.module.less');

const { SubMenu, ItemGroup, Item } = Menu;
// Hack for tslint
const Group = ItemGroup as any;

const NavBar: React.FunctionComponent = () => {
    const match = useRouteMatch();
    return (
        <div className={styles.navbar}>
            <Menu style={{ width: '100%' }} mode="inline">
                <SubMenu
                    key="database"
                    title={
                        <span>
                            <DatabaseOutlined />
                            <span>Database</span>
                        </span>
                    }>
                    <Item key="contaminants">
                        <Link to={`${match.url}/database/contaminants`}>Contaminants</Link>
                    </Item>
                    <Item key="adsorbent">
                        <Link to={`${match.url}/database/adsorbent`}>Adsorbent</Link>
                    </Item>
                </SubMenu>
                <SubMenu
                    key="experiment"
                    title={
                        <span>
                            <ExperimentOutlined />
                            <span>Experiment</span>
                        </span>
                    }>
                    <Item key="profile">
                        <Link to={`${match.url}/exp/profile`}>Profile</Link>
                    </Item>
                </SubMenu>
                <SubMenu
                    key="plot"
                    title={
                        <span>
                            <AreaChartOutlined />
                            <span>Plot</span>
                        </span>
                    }>
                    <Item key="results">
                        <Link to={`${match.url}/plot/res`}>Results</Link>
                    </Item>
                    <Item key="comparison">
                        <Link to={`${match.url}/plot/compare`}>Comparison</Link>
                    </Item>
                </SubMenu>
                <SubMenu
                    key="system"
                    title={
                        <span>
                            <SettingOutlined />
                            <span>System</span>
                        </span>
                    }>
                    <Item key="history">
                        <Link to={`${match.url}/sys/history`}>History</Link>
                    </Item>
                    <Item key="prefer">
                        <Link to={`${match.url}/sys/pref`}>Preference</Link>
                    </Item>
                </SubMenu>
            </Menu>
        </div>
    );
};

export default NavBar;
