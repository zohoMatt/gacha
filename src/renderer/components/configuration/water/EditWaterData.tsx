import * as React from 'react';
import { Divider, Form, Input, Switch } from 'antd';
import { inject, observer } from 'mobx-react';

import { OperationPanel } from '../../common/OperationPanel';
import { ActiveEditing, WaterStore } from '../../../store/water.store';

const styles = require('./EditWaterData.module.less');

export interface EditWaterProps {
    form: React.RefObject<any>;
    // injected
    store?: WaterStore;
}

export interface EditWaterState {
    warning: boolean;
}

@inject('store')
@observer
export class EditWaterData extends React.Component<EditWaterProps, EditWaterState> {
    public state: EditWaterState = { warning: false };

    public changeParams = (allParams: ActiveEditing) => {
        this.props.store!.changeAllParams(allParams);
    };

    public save = (name?: string) => {
        if (name === undefined) {
            this.props.store!.save();
        } else {
            this.props.store!.saveAs(name);
        }
    };

    public triggerQuit = () => {
        if (this.props.store!.changesMade) {
            this.setState({ warning: true });
        } else {
            this.props.store!.resetActiveRecords();
        }
    };

    public quit = (confirm = true) => {
        if (confirm) {
            this.props.store!.cancel();
        }
        this.setState({ warning: false });
    };

    public render() {
        const { form, store } = this.props;
        const { changesMade, activeRecord } = store!;
        const { warning } = this.state;
        const NORMAL_RULES = [{ required: true, message: 'Value cannot be empty' }];

        return (
            <div className={styles.container}>
                <div className={styles.formContainer}>
                    <Form
                        size="small"
                        layout="horizontal"
                        ref={form}
                        hideRequiredMark={true}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 8 }}
                        onValuesChange={(s, all: any) => this.changeParams(all)}
                        initialValues={activeRecord!}>
                        <Form.Item name="name" label="Name" rules={NORMAL_RULES}>
                            <Input disabled />
                        </Form.Item>
                        <Form.Item name="description" label="Description" rules={NORMAL_RULES}>
                            <Input />
                        </Form.Item>
                        <Divider orientation="left">Basic</Divider>
                        <Form.Item name="pressure" label="Pressure" rules={NORMAL_RULES}>
                            <Input type="number" addonAfter="atm" />
                        </Form.Item>
                        <Form.Item name="temperature" label="Temperature" rules={NORMAL_RULES}>
                            <Input type="number" addonAfter="℃" />
                        </Form.Item>
                        <Divider orientation="left">Correlations</Divider>
                        <Form.Item
                            name={['density', 'use']}
                            label="Density"
                            wrapperCol={{ span: 3 }}
                            valuePropName="checked">
                            <Switch />
                        </Form.Item>
                        <Form.Item name={['density', 'value']} label=" " colon={false}>
                            <Input disabled={!activeRecord!.density.use} addonAfter="g/cm³" />
                        </Form.Item>
                        <Form.Item
                            name={['viscosity', 'use']}
                            label="Viscosity"
                            wrapperCol={{ span: 3 }}
                            valuePropName="checked">
                            <Switch />
                        </Form.Item>
                        <Form.Item name={['viscosity', 'value']} label=" " colon={false}>
                            <Input disabled={!activeRecord!.viscosity.use} addonAfter="g/cm·s" />
                        </Form.Item>
                    </Form>
                </div>
                <OperationPanel
                    saveDisabled={!changesMade}
                    warning={warning}
                    onSave={() => this.save()}
                    onSavedAs={(newName: string) => this.save(newName)}
                    onTriggerCancel={this.triggerQuit}
                    onQuitCancel={() => this.quit(false)}
                    onConfirmCancel={this.quit}
                    />
            </div>
        );
    }
}
