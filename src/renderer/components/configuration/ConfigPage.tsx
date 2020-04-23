import * as React from 'react';

import { Badge, Menu } from 'antd';
import { AreaChartOutlined, PaperClipOutlined, InsertRowBelowOutlined } from '@ant-design/icons';

const { SubMenu, ItemGroup, Item } = Menu;

// Hack for tslint
const Group = ItemGroup as any;

const ConfigPage = () => (
    <Menu style={{ width: 256 }} mode="inline">
        <SubMenu
            key="sub1"
            title={
                <span>
                    <PaperClipOutlined />
                    <span>Settings</span>
                </span>
            }>
            <Group key="water" title="Water">
                <Item key="water.props">Properties</Item>
            </Group>
            <Group key="component" title="Components">
                <Item key="component.props">Properties</Item>
                <Item key="component.model">Adsorption Model</Item>
            </Group>
            <Group key="sim" title="Simulation Parameters">
                <Item key="sim.psdm">PSDM</Item>
            </Group>
            <Group key="fixedBed" title="Fixed Bed">
                <Item key="fixedBed.adsorber">Adsorber</Item>
                <Item key="fixedBed.props">Bed Properties</Item>
            </Group>
            <Group key="adsorbent" title="Adsorbent">
                <Item key="adsorbent.database">Database</Item>
                <Item key="adsorbent.props">Properties</Item>
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
            <Item key="comb">Combinations</Item>
        </SubMenu>
        <SubMenu
            key="sub3"
            title={
                <span>
                    <AreaChartOutlined />
                    <span>Plot</span>
                </span>
            }>
            <Item key="results">Results</Item>
            <Item key="comparison">Comparison</Item>
        </SubMenu>
    </Menu>
);

export default ConfigPage;
