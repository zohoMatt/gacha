import * as React from 'react';

import { TableWithEditSection } from '../../../common/container/TableWithEditSection';
import { ViewBedProps } from './ViewBedProps';
import { EditBedTab } from './EditBedTab';

import { BedParams, BedStore } from '../../../../store/bed.store';
import { BriefRecordType } from '../../../../store/base';

export const FixedBedProps: React.FunctionComponent<any> = () => {
    const store = new BedStore();

    return (
        <TableWithEditSection
            title="Fixed Bed Properties"
            store={store}
            renderEdit={({ form, initValues, onValuesChange }) => (
                <EditBedTab form={form} initValues={initValues} onValuesChange={onValuesChange} />
            )}
            renderView={(activeRecord: BriefRecordType<BedParams>) => (
                <ViewBedProps data={activeRecord} />
            )}
            />
    );
};
