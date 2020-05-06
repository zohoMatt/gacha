import * as React from 'react';
import { Form } from 'antd';

import { EditProps } from '../../../container/TableWithEditSection';
import { VALIDATE_MSG_TEMPLATE } from '../../../../../utils/validator';

export const EditAdsorptionData: React.FunctionComponent<EditProps> = ({
    form,
    initValues,
    onValuesChange
}) => {
    return (
        <Form
            size="small"
            layout="horizontal"
            validateMessages={VALIDATE_MSG_TEMPLATE}
            ref={form}
            hideRequiredMark={true}
            labelCol={{ span: 11 }}
            wrapperCol={{ span: 13 }}
            onValuesChange={(s, all: any) => onValuesChange(all)}
            initialValues={initValues}
            />
    );
};
