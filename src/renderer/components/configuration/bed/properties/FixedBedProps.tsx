import * as React from 'react';

import { TableWithEditSection } from '../../../container/TableWithEditSection';
import { ViewBedProps } from './ViewBedProps';
import { EditBedData } from './EditBedData';

import { BedParams, BedStore } from '../../../../store/bed.store';
import { BriefRecordType } from '../../../../store/types';

export const FixedBedProps: React.FunctionComponent<any> = () => {
    const store = new BedStore();

    return (
        <TableWithEditSection
            title="Fixed Bed Properties"
            store={store}
            validator={{}}
            renderEdit={({ form, initValues, onValuesChange }) => (
                <EditBedData form={form} initValues={initValues} onValuesChange={onValuesChange} />
            )}
            renderView={(activeRecord: BriefRecordType<BedParams>) => (
                <ViewBedProps data={activeRecord} />
            )}
            />
    );
};
