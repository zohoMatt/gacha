import * as React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Descriptions } from 'antd';

import { BedMaths } from '../../../../../mods/calculation/independent/bed.maths';
import { Calculation } from '../../../../../mods/calculation/basic';
import { BedInputParams } from '../../../../store/experiment.store';
import { WeakTitle } from '../../../common/elements/WeakTitle';
import { FullRecordType } from '../../../../store/base';
import { AdsorbentParams } from '../../../../store/adsorbent.store';
import { StoreInjectedProp } from '../../../../store/init';

export const ViewBedProps: React.FunctionComponent<BedInputParams & StoreInjectedProp> = inject(
    'store'
)(
    observer(props => {
        const { adsorbent, length, diameter, mass, flowrate, ebct } = props;
        const areaVal = `${Calculation.format(
            BedMaths.crossSectionalArea(`${diameter}cm`).toNumber('cm^2')
        )} cm²`;
        const volumeVal = `${Calculation.format(
            BedMaths.volume(`${length}cm`, `${diameter}cm`).toNumber('cm^3')
        )}cm³`;
        const densityVal = `${Calculation.format(
            BedMaths.density(`${mass}g`, `${length}cm`, `${diameter}cm`).toNumber('g/mL')
        )}g/mL`;

        const ads = props.store!.adsorbent.tableList.find(
            (r: FullRecordType<AdsorbentParams>) => r.key === adsorbent
        );

        return (
            <>
                <Descriptions>
                    <Descriptions.Item label="Adsorbent" span={3}>
                        {ads ? (
                            <Link to={`/workspace/database/adsorbent?key=${adsorbent}`}>
                                {ads.name}
                            </Link>
                        ) : (
                            'N/A'
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Bed Length">{`${length} cm`}</Descriptions.Item>
                    <Descriptions.Item label="Bed Diameter">{`${diameter} cm`}</Descriptions.Item>
                    <Descriptions.Item label="Mass">{`${mass} g`}</Descriptions.Item>
                    <Descriptions.Item label="Flowrate">{`${flowrate} mL/min`}</Descriptions.Item>
                    <Descriptions.Item label="EBCT" span={2}>
                        {`${ebct} min`}
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions title={<WeakTitle title="Calculation" />}>
                    <Descriptions.Item label="Bed Density">{densityVal}</Descriptions.Item>
                    <Descriptions.Item label="Bed Porosity">{`${0}`}</Descriptions.Item>
                    <Descriptions.Item label="Cross-Sectional Area">{areaVal}</Descriptions.Item>
                    <Descriptions.Item label="Bed Volume">{volumeVal}</Descriptions.Item>
                    <Descriptions.Item label="Superficial Velocity">{`${ebct} m/h`}</Descriptions.Item>
                    <Descriptions.Item label="Interstitial Velocity">{`${ebct} m/h`}</Descriptions.Item>
                </Descriptions>
            </>
        );
    })
);
