import * as React from 'react';
import { Form, Tabs } from 'antd';

import { EditProps } from '../common/container/TableWithEditSection';
import { VALIDATE_MSG_TEMPLATE } from '../../../utils/validator';
import { EditWaterTab } from './profile/water/EditWaterTab';
import { BasicInfoFormFields } from '../common/BasicInfo';
import { EditBedTab } from './profile/bed/EditBedTab';
import { EditPsdmTab } from './profile/simParams/EditPsdmTab';
import { EditAdsorptionTab } from './profile/adsorption/EditAdsorptionTab';
import { CalculationResults } from './profile/CalculationResults';
import { ErrorBoundary } from '../common/ErrorBoundary';

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
                    <EditWaterTab {...initValues.water} />
                </TabPane>
                <TabPane tab="Contaminant" key="physchem">
                    <EditAdsorptionTab {...initValues.adsorption} />
                </TabPane>
                <TabPane tab="Fixed Bed" key="bed">
                    <EditBedTab {...initValues.bed} />
                </TabPane>
                <TabPane tab="Simulation: PSDM" key="psdm">
                    <EditPsdmTab {...initValues.psdm} />
                </TabPane>
            </Tabs>
            <ErrorBoundary display="Invalid parameters to calculate.">
                <CalculationResults />
            </ErrorBoundary>
        </Form>
    );
};
