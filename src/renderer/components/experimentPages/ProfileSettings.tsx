import * as React from 'react';

import { TableWithEditSection } from '../common/container/TableWithEditSection';
import { EditProfileData } from './EditProfileData';
import { ExperimentStore } from '../../store/experiment.store';

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
            renderView={() => null}
            />
    );
};
