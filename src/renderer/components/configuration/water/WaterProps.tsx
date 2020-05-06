import * as React from 'react';
import { observer } from 'mobx-react';

import { TableWithEditSection } from '../../container/TableWithEditSection';
import { WaterParams, WaterStore } from '../../../store/water.store';
import { BriefRecordType } from '../../../store/base';
import { EditWaterData } from './EditWaterData';
import { ViewWaterProps } from './ViewWaterProps';

@observer
export class WaterProps extends React.Component {
    public store: WaterStore = new WaterStore();

    public render() {
        return (
            <TableWithEditSection
                title="Water Properties"
                store={this.store}
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
