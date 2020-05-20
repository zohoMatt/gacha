import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { TableWithEditSection } from '../../common/container/TableWithEditSection';
import { ViewContaminantData } from './ViewContaminantData';
import { EditContaminantProps } from './EditContaminantProps';
import { BriefRecordType } from '../../../store/base';
import { StoreInjectedProp } from '../../../store/init';
import { ContaminantParams } from '../../../../utils/storage/types';

export const ContaminantProps: React.FunctionComponent<StoreInjectedProp> = inject('store')(
    observer(({ store }) => {
        return (
            <TableWithEditSection
                title="Contaminant Properties"
                store={store!.contaminant}
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
    })
);
