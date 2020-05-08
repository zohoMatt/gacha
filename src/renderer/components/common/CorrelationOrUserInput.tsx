import * as React from 'react';
import { Checkbox, Input, Tooltip, Typography } from 'antd';

const styles = require('./CorrelationOrUserInput.module.less');

export interface ValueFormat {
    correlation: boolean;
    value: number | string;
}

export interface CheckWithInputProps {
    value?: ValueFormat;
    checkedKey?: string;
    initValue?: ValueFormat;
    unit?: string;
    onChange?: (payload: ValueFormat) => any;
    checkedText?: string;
    decorationText?: string;
    tooltip?: string;
}

export const CorrelationOrUserInput: React.FunctionComponent<CheckWithInputProps> = ({
    unit,
    value,
    initValue,
    checkedText,
    decorationText,
    tooltip,
    onChange
}) => {
    const [checked, setChecked] = React.useState(initValue ? initValue.correlation : false);
    const [input, setInput] = React.useState(initValue ? initValue.value : '');

    const onCheckboxChanged = (status: boolean) => {
        setChecked(status);
        if (onChange) onChange({ correlation: status, value: value ? value.value : input });
    };

    const onInputChanged = (inputText: string | number) => {
        setInput(inputText);
        if (onChange)
            onChange({ correlation: value ? value.correlation : checked, value: inputText });
    };

    const isChecked = value ? value.correlation : checked;

    return (
        <div className={styles.container}>
            <Checkbox
                style={{ marginRight: '0.2vw' }}
                checked={isChecked}
                onChange={e => onCheckboxChanged(e.target.checked)}
                />
            <Typography.Text style={{ marginRight: '1.5vw' }} type="secondary">
                <span>{decorationText}</span>
                {tooltip ? (
                    <>
                        <span>(</span>
                        <Tooltip title={tooltip}>
                            <a>?</a>
                        </Tooltip>
                        <span>)</span>
                    </>
                ) : null}
            </Typography.Text>
            {isChecked ? (
                <span>{checkedText || ''}</span>
            ) : (
                <Input
                    addonAfter={unit || ''}
                    value={value ? value.value : input}
                    onChange={e => onInputChanged(e.target.value)}
                    />
            )}
        </div>
    );
};
