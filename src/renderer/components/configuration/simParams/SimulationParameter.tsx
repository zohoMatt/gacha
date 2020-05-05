import * as React from 'react';

import { TableWithEditSection } from '../../container/TableWithEditSection';
import { ViewPsdmParams } from './ViewPsdmParams';
import { EditPsdmData } from './EditPsdmData';

import { PsdmParams, PsdmStore } from '../../../store/psdm.store';
import { BriefRecordType } from '../../../store/types';

export const SimulationParameter: React.FunctionComponent<any> = () => {
    const store = new PsdmStore();

    return (
        <TableWithEditSection
            title="Simulation Parameters for PSDM"
            store={store}
            renderEdit={({ form, initValues, onValuesChange }) => (
                <EditPsdmData form={form} initValues={initValues} onValuesChange={onValuesChange} />
            )}
            renderView={(activeRecord: BriefRecordType<PsdmParams>) => (
                <ViewPsdmParams data={activeRecord} />
            )}
            />
    );
};
