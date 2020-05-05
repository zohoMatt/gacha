import * as React from 'react';

import { EditAdsorbentData } from './EditAdsorbentData';
import { ViewAdsorbentData } from './ViewAdsorbentData';
import { TableWithEditSection } from '../../../container/TableWithEditSection';
import { AdsorbentParams, AdsorbentStore } from '../../../../store/adsorbent.store';
import { BriefRecordType } from '../../../../store/types';

export const AdsorbentDatabase: React.FunctionComponent<any> = () => {
    const store = new AdsorbentStore();

    return (
        <TableWithEditSection
            title="Adsorbent Database"
            store={store}
            renderEdit={({ form, initValues, onValuesChange }) => (
                <EditAdsorbentData
                    form={form}
                    initValues={initValues}
                    onValuesChange={onValuesChange}
                    />
            )}
            renderView={(activeRecord: BriefRecordType<AdsorbentParams>) => (
                <ViewAdsorbentData data={activeRecord} />
            )}
            />
    );
};
