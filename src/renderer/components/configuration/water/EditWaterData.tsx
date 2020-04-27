import * as React from 'react';
import { Divider, Form, Input } from 'antd';
import { inject, observer } from 'mobx-react';

import { InputSwitcher } from '../../common/InputSwitcher';
import { OperationPanel } from '../../common/OperationPanel';
import { ActiveEditing, WaterStore } from '../../../store/water.store';
import { InputSwitcherType } from '../../../store/types';

const styles = require('./EditWaterData.module.less');

export interface EditWaterProps {
    // injected
    store?: WaterStore;
}

@inject('store')
@observer
export class EditWaterData extends React.Component<EditWaterProps> {
    public onInputChange = (key: keyof ActiveEditing) => {
        return (e: any) => {
            this.props.store!.changeParam(key, e.target.value);
            this.props.store!.makeChanges();
        };
    };

    public onInternalSwitcherChange = (
        key: string,
        rkey: keyof InputSwitcherType,
        value: boolean | number
    ) => {
        const record: any = this.props.store!.activeRecord!;
        this.props.store!.changeParam(key, {
            ...record,
            [rkey]: value
        });
        this.props.store!.makeChanges();
    };

    public render() {
        const {
            name,
            description,
            pressure,
            temperature,
            density,
            viscosity
        } = this.props.store!.activeRecord!;
        const { changesMade } = this.props.store!;

        return (
            <div className={styles.container}>
                <div className={styles.formContainer}>
                    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 8 }}>
                        <Form.Item label="Name">
                            <Input value={name} onChange={this.onInputChange('name')} disabled />
                        </Form.Item>
                        <Form.Item label="Description">
                            <Input
                                value={description}
                                onChange={this.onInputChange('description')}
                                />
                        </Form.Item>
                        <Divider orientation="left">Basic</Divider>
                        <Form.Item label="Pressure">
                            <Input
                                type="number"
                                value={pressure}
                                onChange={this.onInputChange('pressure')}
                                addonAfter="atm"
                                />
                        </Form.Item>
                        <Form.Item label="Temperature">
                            <Input
                                type="number"
                                value={temperature}
                                onChange={this.onInputChange('temperature')}
                                addonAfter="℃"
                                />
                        </Form.Item>
                        <Divider orientation="left">Correlations</Divider>
                        <Form.Item label="Density">
                            <InputSwitcher
                                status={density.use}
                                value={density.value}
                                onSwitchChange={(s: any) =>
                                    this.onInternalSwitcherChange('density', 'use', s)
                                }
                                onInputChange={(e: any) =>
                                    this.onInternalSwitcherChange(
                                        'density',
                                        'value',
                                        e.target.value
                                    )
                                }
                                unit="g/cm³"
                                />
                        </Form.Item>
                        <Form.Item label="Viscosity">
                            <InputSwitcher
                                status={viscosity.use}
                                value={viscosity.value}
                                onSwitchChange={(s: any) =>
                                    this.onInternalSwitcherChange('viscosity', 'use', s)
                                }
                                onInputChange={(e: any) =>
                                    this.onInternalSwitcherChange(
                                        'viscosity',
                                        'value',
                                        e.target.value
                                    )
                                }
                                unit="g/cm·s"
                                />
                        </Form.Item>
                    </Form>
                </div>
                <OperationPanel saveDisabled={!changesMade} />
            </div>
        );
    }
}
