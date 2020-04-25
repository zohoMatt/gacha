import * as React from 'react';
import { Input, Switch } from 'antd';

const styles = require('./InputSwitcher.module.less');

export interface InputSwitcherProps {
    unit: string;
    onChange?: (...args: any[]) => any;
    status?: boolean;
}

export interface InputSwitcherState {
    switchOn: boolean;
}

export class InputSwitcher extends React.Component<InputSwitcherProps, InputSwitcherState> {
    constructor(props: any) {
        super(props);
        this.state = {
            switchOn: this.props.status || false
        };
    }

    protected onChange(status: boolean) {
        this.setState({ switchOn: status });
        if (this.props.onChange) this.props.onChange();
    }

    public render() {
        const { unit } = this.props;
        const { switchOn } = this.state;
        return (
            <div className={styles.combine}>
                <Switch checked={switchOn} onChange={this.onChange.bind(this)} />
                <Input addonAfter={unit} disabled={!this.state.switchOn} />
            </div>
        );
    }
}
