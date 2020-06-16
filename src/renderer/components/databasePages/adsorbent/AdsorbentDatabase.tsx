import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { EditAdsorbentData } from './EditAdsorbentData';
import { ViewAdsorbentData } from './ViewAdsorbentData';
import { TableWithEditSection } from '../../common/container/TableWithEditSection';
import { BriefRecordType } from '../../../store/base';
import { StoreInjectedProp } from '../../../store';
import { AdsorbentParams } from '../../../../utils/storage/types';

export const AdsorbentDatabase: React.FunctionComponent<StoreInjectedProp> = inject('store')(
    observer(({ store }) => {
        return (
            <TableWithEditSection
                title="Adsorbent Database"
                store={store!.adsorbent}
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
    })
);
