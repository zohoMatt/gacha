import * as React from 'react';

import { TableWithEditSection } from '../common/container/TableWithEditSection';
import { EditProfileData } from './EditProfileData';
import { ExperimentStore, ExpProfileParams } from '../../store/experiment.store';
import { BriefRecordType } from '../../store/base';
import { ViewProfile } from './ViewProfile';

export const ProfileSettings: React.FunctionComponent = () => {
    return (
        <TableWithEditSection
            title="Experiment Profile"
            store={new ExperimentStore()}
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
};
