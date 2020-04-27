import * as React from 'react';
import { Switch } from 'antd';

const styles = require('./TextSwitcher.module.less');

export interface TextSwitcherProps {
    value?: boolean;
    onChange?: (checked: boolean) => void;
    text?: string | number;
}

const TextSwitcher: React.FunctionComponent<TextSwitcherProps> = ({ value, onChange, text }) => {
    const [checked, setChecked] = React.useState(value || false);

    const triggerChange = (newVal: boolean) => {
        setChecked(newVal);
        if (onChange) onChange(newVal);
    };

    return (
        <span>
            <Switch checked={checked} onChange={triggerChange} />
            <span className={styles.text}>{text || ''}</span>
        </span>
    );
};

export { TextSwitcher };
