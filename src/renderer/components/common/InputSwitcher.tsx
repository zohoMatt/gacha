import * as React from 'react';
import { Input, Switch } from 'antd';

const styles = require('./InputSwitcher.module.less');

export interface InputSwitcherProps {
    unit: string;
    value: number;
    onSwitchChange?: any;
    onInputChange?: any;
    status?: boolean;
}

const InputSwitcher: React.FunctionComponent<InputSwitcherProps> = ({
    unit,
    status,
    value,
    onSwitchChange,
    onInputChange
}) => {
    return (
        <div className={styles.combine}>
            <Switch checked={status} onClick={onSwitchChange} />
            <Input
                type="number"
                value={value}
                onChange={onInputChange}
                addonAfter={unit}
                disabled={!status}
                />
        </div>
    );
};

export { InputSwitcher };
