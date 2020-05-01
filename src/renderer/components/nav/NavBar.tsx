import * as React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { Menu } from 'antd';
import { AreaChartOutlined, DatabaseOutlined, InsertRowBelowOutlined } from '@ant-design/icons';

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
                    key="sub1"
                    title={
                        <span>
                            <DatabaseOutlined />
                            <span>Database</span>
                        </span>
                    }>
                    <Group key="water" title="Water">
                        <Item key="water.props">
                            <Link to={`${match.url}/settings/water/prop`}>Properties</Link>
                        </Item>
                    </Group>
                    <Group key="component" title="Components">
                        <Item key="component.props">
                            <Link to={`${match.url}/settings/components/prop`}>Properties</Link>
                        </Item>
                    </Group>
                    <Group key="sim" title="Simulation Parameters">
                        <Item key="sim.psdm">
                            <Link to={`${match.url}/settings/sim/psdm`}>PSDM</Link>
                        </Item>
                    </Group>
                    <Group key="fixedBed" title="Fixed Bed">
                        <Item key="fixedBed.props">
                            <Link to={`${match.url}/settings/bed/prop`}>Bed Properties</Link>
                        </Item>
                    </Group>
                    <Group key="adsorbent" title="Adsorbent">
                        <Item key="adsorbent.database">
                            <Link to={`${match.url}/settings/adsorbent/db`}>Database</Link>
                        </Item>
                        <Item key="adsorbent.props">
                            <Link to={`${match.url}/settings/adsorbent/prop`}>Properties</Link>
                        </Item>
                    </Group>
                </SubMenu>
                <SubMenu
                    key="sub2"
                    title={
                        <span>
                            <InsertRowBelowOutlined />
                            <span>Data Sets</span>
                        </span>
                    }>
                    <Item key="comb">
                        <Link to={`${match.url}/dataset/comb`}>Combinations</Link>
                    </Item>
                </SubMenu>
                <SubMenu
                    key="sub3"
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
            </Menu>
        </div>
    );
};

export default NavBar;
