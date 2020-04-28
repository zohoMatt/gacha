import * as React from 'react';
import { Switch } from 'antd';

const styles = require('./TextSwitcher.module.less');

export interface TextSwitcherProps {
    value?: boolean;
    onChange?: (checked: boolean) => void;
    text?: string | number;
}

const TextSwitcher: React.FunctionComponent<TextSwitcherProps> = ({ value, onChange, text }) => {
    const triggerChange = (newVal: boolean) => {
        if (onChange) onChange(newVal);
    };

    return (
        <span>
            <Switch checked={value} onChange={triggerChange} />
            <span className={styles.text}>{text || ''}</span>
        </span>
    );
};

export { TextSwitcher };
