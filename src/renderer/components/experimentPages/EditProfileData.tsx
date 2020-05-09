import * as React from 'react';
import { Form, Tabs } from 'antd';

import { EditProps } from '../common/container/TableWithEditSection';
import { VALIDATE_MSG_TEMPLATE } from '../../../utils/validator';

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
            <Tabs defaultActiveKey="water">
                <TabPane tab="Water" key="water" />
                <TabPane tab="Fixed Bed" key="bed" />
                <TabPane tab="Phys. Chem. Properties" key="physchem" />
                <TabPane tab="PSDM Simulation" key="psdm" />
            </Tabs>
        </Form>
    );
};
