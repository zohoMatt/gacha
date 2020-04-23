import * as React from 'react';

import { Menu } from 'antd';

const { SubMenu, Item } = Menu;

const ConfigPage = () => (
    <Menu>
        <SubMenu key="sub1" title="Settings">
            <Item key="i1">Basic</Item>
            <Item key="i2">Kinetics</Item>
        </SubMenu>
    </Menu>
);

export default ConfigPage;
