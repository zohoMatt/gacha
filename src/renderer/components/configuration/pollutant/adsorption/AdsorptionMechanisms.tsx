import * as React from 'react';

import { TableWithEditSection } from '../../../container/TableWithEditSection';
import { AdsorptionParams, AdsorptionStore } from '../../../../store/adsorption.store';
import { BriefRecordType } from '../../../../store/base';
import { ViewAdsorptionData } from './ViewAdsorptionData';
import { EditAdsorptionData } from './EditAdsorptionData';

export const AdsorptionMechanisms: React.FunctionComponent = () => {
    return (
        <TableWithEditSection
            title="Kinetics & Isotherms"
            store={new AdsorptionStore()}
            renderEdit={({ form, initValues, onValuesChange }) => (
                <EditAdsorptionData
                    form={form}
                    initValues={initValues}
                    onValuesChange={onValuesChange}
                    />
            )}
            renderView={(record: BriefRecordType<AdsorptionParams>) => (
                <ViewAdsorptionData data={record} />
            )}
            />
    );
};
