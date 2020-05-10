import * as React from 'react';

import { TableWithEditSection } from '../../common/container/TableWithEditSection';
import { ViewContaminantData } from './ViewContaminantData';
import { EditContaminantProps } from './EditContaminantProps';
import { Store } from '../../../store/init';
import { ContaminantParams } from '../../../store/contaminant.store';
import { BriefRecordType } from '../../../store/base';

export const ContaminantProps: React.FunctionComponent = () => {
    return (
        <TableWithEditSection
            title="Contaminant Properties"
            store={Store.root.contaminant}
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
