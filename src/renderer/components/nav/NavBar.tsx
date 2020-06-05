import * as React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Menu } from 'antd';
import { createHashHistory } from 'history';
import { ExperimentOutlined, SettingOutlined } from '@ant-design/icons/lib';
import { AreaChartOutlined, DatabaseOutlined, InsertRowBelowOutlined } from '@ant-design/icons';

const styles = require('./NavBar.module.less');

const { SubMenu, Item } = Menu;

export enum NAV_KEYS {
    Database = 'database',
    Experiment = 'experiment',
    Plot = 'plot',
    System = 'system'
}

export enum ITEM_KEYS {
    Contaminant = 'contaminant',
    Adsorbent = 'adsorbent',
    Profile = 'profile',
    Status = 'status',
    Comparison = 'comparison',
    History = 'history',
    Prefer = 'prefer'
}

export const NavBar: React.FunctionComponent = () => {
    const match = useRouteMatch();
    const [selected, setMenu] = React.useState(
        window.location.href.split('/').pop() || ITEM_KEYS.Contaminant
    );

    // Auto-select specified menu item
    const history = createHashHistory({
        basename: match.path
    });
    React.useEffect(() => {
        history.listen((location: any) => {
            const item = location.pathname.split('/')[2];
            if (item) setMenu(item);
        });
    }, [0]);

    return (
        <div className={styles.navbar}>
            <Menu
                mode="inline"
                style={{ width: '100%' }}
                defaultOpenKeys={Object.values(NAV_KEYS)}
                selectedKeys={[selected]}>
                <SubMenu
                    key={NAV_KEYS.Database}
                    title={
                        <span>
                            <DatabaseOutlined />
                            <span>Database</span>
                        </span>
                    }>
                    <Item key={ITEM_KEYS.Contaminant}>
                        <Link to={`${match.url}/${NAV_KEYS.Database}/${ITEM_KEYS.Contaminant}`}>
                            Contaminants
                        </Link>
                    </Item>
                    <Item key={ITEM_KEYS.Adsorbent}>
                        <Link to={`${match.url}/${NAV_KEYS.Database}/${ITEM_KEYS.Adsorbent}`}>
                            Adsorbent
                        </Link>
                    </Item>
                </SubMenu>
                <SubMenu
                    key={NAV_KEYS.Experiment}
                    title={
                        <span>
                            <ExperimentOutlined />
                            <span>Experiment</span>
                        </span>
                    }>
                    <Item key={ITEM_KEYS.Profile}>
                        <Link to={`${match.url}/${NAV_KEYS.Experiment}/${ITEM_KEYS.Profile}`}>
                            Profile
                        </Link>
                    </Item>
                </SubMenu>
                <SubMenu
                    key={NAV_KEYS.Plot}
                    title={
                        <span>
                            <AreaChartOutlined />
                            <span>Plot</span>
                        </span>
                    }>
                    <Item key={ITEM_KEYS.Status}>
                        <Link to={`${match.url}/${NAV_KEYS.Plot}/${ITEM_KEYS.Status}`}>Status</Link>
                    </Item>
                    <Item key={ITEM_KEYS.Comparison}>
                        <Link to={`${match.url}/${NAV_KEYS.Plot}/${ITEM_KEYS.Comparison}`}>
                            Comparison
                        </Link>
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
                        <Link to={`${match.url}/${NAV_KEYS.System}/${ITEM_KEYS.History}`}>
                            History
                        </Link>
                    </Item>
                    <Item key={ITEM_KEYS.Prefer}>
                        <Link to={`${match.url}/${NAV_KEYS.System}/${ITEM_KEYS.Prefer}`}>
                            Preference
                        </Link>
                    </Item>
                </SubMenu>
            </Menu>
        </div>
    );
};
