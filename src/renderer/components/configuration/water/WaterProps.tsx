import * as React from 'react';
import { observer } from 'mobx-react';

import { TableWithEditSection } from '../../container/TableWithEditSection';
import { WaterPropertiesValidators } from '../../../../utils/validators/waterProperties.valid';
import { WaterParams, WaterStore } from '../../../store/water.store';
import { BriefRecordType, TableWithEditStore } from '../../../store/types';
import { EditWaterData } from './EditWaterData';
import { ViewWaterProps } from './ViewWaterProps';

@observer
export class WaterProps extends React.Component {
    public store: TableWithEditStore<WaterParams> = new WaterStore();

    public render() {
        return (
            <TableWithEditSection
                title="Water Properties"
                store={this.store}
                validator={WaterPropertiesValidators}
                renderEdit={({ form, initValues, onValuesChange }) => (
                    <EditWaterData
                        form={form}
                        initValues={initValues}
                        onValuesChange={onValuesChange}
                        />
                )}
                renderView={(activeRecord: BriefRecordType<WaterParams>) => (
                    <ViewWaterProps data={activeRecord} />
                )}
                />
        );
    }
}
