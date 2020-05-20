import * as React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Descriptions } from 'antd';

import { BedMaths } from '../../../../../mods/calculation/independent/bed.maths';
import { Calculation } from '../../../../../mods/calculation/basic';
import { BedInputParams } from '../../../../store/expProfile.store';
import { WeakTitle } from '../../../common/elements/WeakTitle';
import { FullRecordType } from '../../../../store/base';
import { AdsorbentParams } from '../../../../store/adsorbent.store';
import { StoreInjectedProp } from '../../../../store/init';
import { NAV_KEYS, ITEM_KEYS } from '../../../nav/NavBar';

export const ViewBedProps: React.FunctionComponent<BedInputParams & StoreInjectedProp> = inject(
    'store'
)(
    observer(props => {
        const { adsorbent, length, diameter, mass, flowrate, ebct } = props;
        const { display: d, combine: c } = Calculation;
        const area = d(BedMaths.crossSectionalArea(c(diameter)));
        const volume = d(BedMaths.volume(c(length), c(diameter)));
        const density = d(BedMaths.density(c(mass), c(length), c(diameter)));

        const ads = props.store!.adsorbent.tableList.find(
            (r: FullRecordType<AdsorbentParams>) => r.key === adsorbent
        );

        return (
            <>
                <Descriptions>
                    <Descriptions.Item label="Adsorbent" span={3}>
                        {ads ? (
                            <Link
                                to={`/workspace/${NAV_KEYS.Database}/${ITEM_KEYS.Adsorbent}?key=${adsorbent}`}>
                                {ads.name}
                            </Link>
                        ) : (
                            'N/A'
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Bed Length">{d(length)}</Descriptions.Item>
                    <Descriptions.Item label="Bed Diameter">{d(diameter)}</Descriptions.Item>
                    <Descriptions.Item label="Mass">{d(mass)}</Descriptions.Item>
                    <Descriptions.Item label="Flowrate">{d(flowrate)}</Descriptions.Item>
                    <Descriptions.Item label="EBCT" span={2}>
                        {d(ebct)}
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions title={<WeakTitle title="Calculation" />}>
                    <Descriptions.Item label="Bed Density">{density}</Descriptions.Item>
                    <Descriptions.Item label="Bed Porosity">{`${0}`}</Descriptions.Item>
                    <Descriptions.Item label="Cross-Sectional Area">{area}</Descriptions.Item>
                    <Descriptions.Item label="Bed Volume">{volume}</Descriptions.Item>
                    <Descriptions.Item label="Superficial Velocity">xxx m/h</Descriptions.Item>
                    <Descriptions.Item label="Interstitial Velocity">xxx m/h</Descriptions.Item>
                </Descriptions>
            </>
        );
    })
);
