import * as React from 'react';
import DataSetSelector, { DataSetEntry } from '../../common/DataSetSelector';

interface MockParams {
    cij: number;
    slope: number;
    rsquare: number;
}
const mockdata: DataSetEntry<MockParams>[] = [
    {
        key: 'a1',
        name: 'first experiment',
        description: '2019-02-12 by pp',
        params: {
            cij: 2.3,
            slope: 0.0004,
            rsquare: 0.9776
        },
        active: false,
        disabled: false
    },
    {
        key: 'a2',
        name: '2nd experiment',
        description: '2020-02-12 by pp',
        params: {
            cij: 2.4,
            slope: 0.0104,
            rsquare: 0.9867
        },
        active: false,
        disabled: false
    },
    {
        key: 'a3',
        name: '3rd experiment',
        description: '2020-02-21 by pp',
        params: {
            cij: 2.4001,
            slope: 0.0106,
            rsquare: 0.9887
        },
        active: true,
        disabled: false
    },
    {
        key: 'a4',
        name: '4th experiment',
        description: '2020-03-21 by pp',
        params: {
            cij: 3.1001,
            slope: 0.0106,
            rsquare: 0.99987
        },
        active: false,
        disabled: true
    }
];

const WaterProps: React.FunctionComponent = () => (
    <div>
        <DataSetSelector database={mockdata} />
    </div>
);

export default WaterProps;
