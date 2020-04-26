import * as React from 'react';
import { Button, Divider, Input, Popover, Popconfirm } from 'antd';

import { inject, observer } from 'mobx-react';
import { InputSwitcher } from '../../common/InputSwitcher';
import { WaterStore } from '../../../store/water.store';

const styles = require('./EditWaterData.module.less');

export interface EditWaterProps {
    name: string;
    description: string;
    pressure: number;
    temperature: number;
    density: number | null;
    viscosity: number | null;
    // injected
    store?: WaterStore;
}

@inject('store')
@observer
export class EditWaterData extends React.Component<EditWaterProps> {
    public onInputChange = (key: keyof EditWaterProps) => {
        return (e: any) => {
            if (this.props.store!.changeParam) {
                this.props.store!.changeParam(key, e.target.value);
            }
        };
    };

    public onSwitchChange = (
        key: keyof EditWaterProps,
        status: boolean,
        input?: string | number
    ) => {
        return (s: boolean) => null;
    };

    public render() {
        const { name, description, pressure, temperature, density, viscosity } = this.props;
        const { onInputChange, onSwitchChange } = this;
        return (
            <div className={styles.container}>
                <div className={styles.formContainer}>
                    <Input value={name} onChange={onInputChange('name')} disabled />
                    <Input value={description} onChange={onInputChange('description')} />
                    <Divider orientation="left">Basic</Divider>
                    <Input value={pressure} onChange={onInputChange('pressure')} addonAfter="atm" />
                    <Input
                        value={temperature}
                        onChange={onInputChange('temperature')}
                        addonAfter="℃"
                        />
                    <Divider orientation="left">Correlations</Divider>
                    <InputSwitcher
                        status={density !== null}
                        initValue={density || 0}
                        onChange={(s, v) => onSwitchChange('density', s, v)}
                        unit="g/cm³"
                        />
                    <InputSwitcher
                        status={viscosity !== null}
                        initValue={viscosity || 0}
                        onChange={(s, v) => onSwitchChange('viscosity', s, v)}
                        unit="g/cm·s"
                        />
                </div>
                <div className={styles.btnPanel}>
                    <Button type="primary">Save</Button>
                    <Popover
                        content={
                            <div>
                                <Input />
                                <a>Confirm</a>
                                <a>Cancel</a>
                            </div>
                        }
                        title="Name of new parameter group"
                        trigger="click">
                        <Button type="primary">Save as</Button>
                    </Popover>
                    <Popconfirm placement="top" title="Discard changes?" onConfirm={() => null}>
                        <Button type="danger" ghost>
                            Cancel
                        </Button>
                    </Popconfirm>
                </div>
            </div>
        );
    }
}
