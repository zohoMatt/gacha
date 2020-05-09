import * as React from 'react';
import { Form, Tabs } from 'antd';

import { EditProps } from '../common/container/TableWithEditSection';
import { VALIDATE_MSG_TEMPLATE } from '../../../utils/validator';
import { EditWaterData } from './profile/water/EditWaterData';
import { BasicInfoFormFields } from '../common/BasicInfo';

export const EditProfileData: React.FunctionComponent<EditProps> = ({
    form,
    initValues,
    onValuesChange
}) => {
    const { TabPane } = Tabs;

    return (
        <Form
            size="small"
            layout="horizontal"
            ref={form}
            validateMessages={VALIDATE_MSG_TEMPLATE}
            hideRequiredMark={true}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 8 }}
            onValuesChange={(s, all: any) => onValuesChange(all)}
            initialValues={initValues}>
            <Tabs defaultActiveKey="basic">
                <TabPane tab="Basic" key="basic">
                    <BasicInfoFormFields />
                </TabPane>
                <TabPane tab="Water" key="water">
                    <EditWaterData {...initValues.water} />
                </TabPane>
                <TabPane tab="Fixed Bed" key="bed" />
                <TabPane tab="Phys. Chem. Properties" key="physchem" />
                <TabPane tab="PSDM Simulation" key="psdm" />
            </Tabs>
        </Form>
    );
};
