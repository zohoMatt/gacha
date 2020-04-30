import * as React from 'react';
import { observer } from 'mobx-react';

import { TableWithEditSection } from '../../common/pageScale/TableWithEditSection';

@observer
export class WaterProps extends React.Component {
    public render() {
        return <TableWithEditSection />;
    }
}
