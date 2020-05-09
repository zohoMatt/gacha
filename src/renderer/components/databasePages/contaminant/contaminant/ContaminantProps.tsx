import * as React from 'react';

import { TableWithEditSection } from '../../../common/container/TableWithEditSection';
import { ViewContaminantData } from './ViewContaminantData';
import { EditContaminantProps } from './EditContaminantProps';
import { ContaminantParams, ContaminantStore } from '../../../../store/contaminant.store';
import { BriefRecordType } from '../../../../store/base';

export const ContaminantProps: React.FunctionComponent = () => {
    return (
        <TableWithEditSection
            title="Contaminant Properties"
            store={new ContaminantStore()}
            renderEdit={({ form, initValues, onValuesChange }) => (
                <EditContaminantProps
                    form={form}
                    initValues={initValues}
                    onValuesChange={onValuesChange}
                    />
            )}
            renderView={(activeRecord: BriefRecordType<ContaminantParams>) => (
                <ViewContaminantData data={activeRecord} />
            )}
            />
    );
};
