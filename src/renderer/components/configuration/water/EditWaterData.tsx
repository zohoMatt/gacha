import * as React from 'react';
import { Button, Divider, Form, Input, Popover, Popconfirm } from 'antd';

import { inject, observer } from 'mobx-react';
import { InputSwitcher } from '../../common/InputSwitcher';
import { WaterStore } from '../../../store/water.store';
import { InputSwitcherType } from '../../../store/types';

const styles = require('./EditWaterData.module.less');

export interface EditWaterProps {
    name: string;
    description: string;
    pressure: number;
    temperature: number;
    density: InputSwitcherType;
    viscosity: InputSwitcherType;
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

    public onInternalSwitchChange = (key: string, status: boolean) => {
        const record: any = this.props.store!.activeRecord!;
        record[key] = {
            use: status,
            value: record[key].value
        };
    };

    public onInternalInputChange = (key: string, value: number) => {
        const record: any = this.props.store!.activeRecord!;
        record[key] = {
            use: record.status,
            value
        };
    };

    public render() {
        const { name, description, pressure, temperature, density, viscosity } = this.props;
        const { onInputChange } = this;
        return (
            <div className={styles.container}>
                <div className={styles.formContainer}>
                    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 8 }}>
                        <Form.Item label="Name">
                            <Input value={name} onChange={onInputChange('name')} disabled />
                        </Form.Item>
                        <Form.Item label="Description">
                            <Input value={description} onChange={onInputChange('description')} />
                        </Form.Item>
                        <Divider orientation="left">Basic</Divider>
                        <Form.Item label="Pressure">
                            <Input
                                type="number"
                                value={pressure}
                                onChange={onInputChange('pressure')}
                                addonAfter="atm"
                                />
                        </Form.Item>
                        <Form.Item label="Temperature">
                            <Input
                                type="number"
                                value={temperature}
                                onChange={onInputChange('temperature')}
                                addonAfter="℃"
                                />
                        </Form.Item>
                        <Divider orientation="left">Correlations</Divider>
                        <Form.Item label="Density">
                            <InputSwitcher
                                status={density.use}
                                value={density.value}
                                onSwitchChange={(s: any) =>
                                    this.onInternalSwitchChange('density', s)
                                }
                                onInputChange={(e: any) =>
                                    this.onInternalInputChange('density', e.target.value)
                                }
                                unit="g/cm³"
                                />
                        </Form.Item>
                        <Form.Item label="Viscosity">
                            <InputSwitcher
                                status={viscosity.use}
                                value={viscosity.value}
                                onSwitchChange={(s: any) =>
                                    this.onInternalSwitchChange('viscosity', s)
                                }
                                onInputChange={(e: any) =>
                                    this.onInternalInputChange('viscosity', e.target.value)
                                }
                                unit="g/cm·s"
                                />
                        </Form.Item>
                    </Form>
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
