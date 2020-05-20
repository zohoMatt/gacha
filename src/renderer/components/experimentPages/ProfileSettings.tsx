import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { TableWithEditSection } from '../common/container/TableWithEditSection';
import { EditProfileData } from './EditProfileData';
import { ExpProfileParams } from '../../store/expProfile.store';
import { BriefRecordType } from '../../store/base';
import { ViewProfile } from './ViewProfile';
import { StoreInjectedProp } from '../../store/init';

export const ProfileSettings: React.FunctionComponent<StoreInjectedProp> = inject('store')(
    observer(({ store }) => {
        return (
            <TableWithEditSection
                title="Experiment Profile"
                store={store!.exp}
                renderEdit={({ form, initValues, onValuesChange }) => (
                    <EditProfileData
                        form={form}
                        initValues={initValues}
                        onValuesChange={onValuesChange}
                        />
                )}
                renderView={(activeRecord: BriefRecordType<ExpProfileParams>) => (
                    <ViewProfile data={activeRecord} />
                )}
                />
        );
    })
);
