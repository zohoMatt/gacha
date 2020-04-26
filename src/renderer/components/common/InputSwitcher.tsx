import * as React from 'react';
import { Input, Switch } from 'antd';

const styles = require('./InputSwitcher.module.less');

export interface InputSwitcherProps {
    unit: string;
    initValue?: number;
    onChange?: (status: boolean, input?: string | number) => any;
    status?: boolean;
}

export interface InputSwitcherState {
    switchOn: boolean;
    input: string | number;
}

export class InputSwitcher extends React.Component<InputSwitcherProps, InputSwitcherState> {
    constructor(props: any) {
        super(props);
        const { status, initValue } = this.props;
        this.state = {
            switchOn: status || false,
            input: initValue || 0
        };
    }

    protected onChange(status: boolean, input?: string | number) {
        this.setState({ switchOn: status });
        if (this.props.onChange) this.props.onChange(status, input);
    }

    public render() {
        const { unit, initValue } = this.props;
        const { switchOn } = this.state;
        const { onChange } = this;
        return (
            <div className={styles.combine}>
                <Switch checked={switchOn} onChange={s => onChange(s)} />
                <Input
                    defaultValue={initValue || 0}
                    onChange={e => onChange(switchOn, e.target.value)}
                    addonAfter={unit}
                    disabled={!this.state.switchOn}
                    />
            </div>
        );
    }
}
