import * as React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Descriptions } from 'antd';

import { BedMaths } from '../../../../../mods/calculation/independent/bed.maths';
import { Calculation } from '../../../../../mods/calculation/basic';
import { WeakTitle } from '../../../common/elements/WeakTitle';
import { StoreInjectedProp } from '../../../../store/init';
import { NAV_KEYS, ITEM_KEYS } from '../../../nav/NavBar';
import { AdsorbentData, BedInputParams } from '../../../../../utils/storage/types';

export const ViewBedProps: React.FunctionComponent<BedInputParams & StoreInjectedProp> = inject(
    'store'
)(
    observer(props => {
        // Hooks
        const [adsorbentData, setAdsorbent] = React.useState({} as AdsorbentData);
        React.useEffect(() => {
            props
                .store!.adsorbent.tableList()
                .then(list => list.find((r: AdsorbentData) => r.key === adsorbent))
                .then(v => v && setAdsorbent(v));
        });

        const { adsorbent, length, diameter, mass, flowrate, ebct } = props;
        const { display: d, combine: c } = Calculation;
        const area = d(BedMaths.crossSectionalArea(c(diameter)));
        const volume = d(BedMaths.volume(c(length), c(diameter)));
        const density = d(BedMaths.density(c(mass), c(length), c(diameter)));

        return (
            <>
                <Descriptions>
                    <Descriptions.Item label="Adsorbent" span={3}>
                        {adsorbentData.name ? (
                            <Link
                                to={`/workspace/${NAV_KEYS.Database}/${ITEM_KEYS.Adsorbent}?key=${adsorbent}`}>
                                {adsorbentData.name}
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
