import * as React from 'react';

import { EditAdsorbentData } from './EditAdsorbentData';
import { ViewAdsorbentData } from './ViewAdsorbentData';
import { TableWithEditSection } from '../../common/container/TableWithEditSection';
import { Store } from '../../../store/init';
import { AdsorbentParams } from '../../../store/adsorbent.store';
import { BriefRecordType } from '../../../store/base';

export const AdsorbentDatabase: React.FunctionComponent<any> = () => {
    return (
        <TableWithEditSection
            title="Adsorbent Database"
            store={Store.root.adsorbent}
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
