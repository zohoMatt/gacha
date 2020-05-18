import * as React from 'react';
import { Link } from 'react-router-dom';
import { Descriptions } from 'antd';
import { observer, inject } from 'mobx-react';

import { AdsorptionInputParams } from '../../../../store/experiment.store';
import { WeakTitle } from '../../../common/elements/WeakTitle';
import { StoreInjectedProp } from '../../../../store/init';
import { ITEM_KEYS, NAV_KEYS } from '../../../nav/NavBar';

export const ViewAdsorptionData: React.FunctionComponent<AdsorptionInputParams &
    StoreInjectedProp> = inject('store')(
    observer(data => {
        const { store, contaminant, initConcent, kinetics, freundlich } = data;

        const { filmDiffusion, poreDiffusion, surfaceDiffusion, spdfr, tortuosity } = kinetics;
        const { k, nth } = freundlich;

        const contaminantRecord = contaminant
            ? store!.contaminant.queryWithKeyInList(contaminant)
            : null;

        return (
            <>
                <Descriptions>
                    <Descriptions.Item label="Contaminant">
                        {contaminantRecord ? (
                            <Link
                                to={`/workspace/${NAV_KEYS.Database}/${ITEM_KEYS.Contaminant}?key=${contaminant}`}>
                                {contaminantRecord.name}
                            </Link>
                        ) : (
                            'N/A'
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Initial Concentration">
                        {initConcent} μg/L
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions title={<WeakTitle title="Kinetics" />}>
                    <Descriptions.Item label="Film Diffusion">
                        {`${
                            filmDiffusion.correlation
                                ? `cm/s (Gnielinski)`
                                : `${filmDiffusion.value}cm²/s (User Input)`
                        }`}
                    </Descriptions.Item>
                    <Descriptions.Item label="Surface Diffusion">
                        {`${
                            surfaceDiffusion.correlation
                                ? `cm²/s (Sontheimer)`
                                : `${surfaceDiffusion.value}cm²/s (User Input)`
                        }`}
                    </Descriptions.Item>
                    <Descriptions.Item label="Pore Diffusion">
                        {`${
                            poreDiffusion.correlation
                                ? `cm²/s (Hayduk & Laudie)`
                                : `${poreDiffusion.value}cm²/s (User Input)`
                        }`}
                    </Descriptions.Item>
                    <Descriptions.Item label="SPDFR">{spdfr}</Descriptions.Item>
                    <Descriptions.Item label="Tortuosity">{tortuosity}</Descriptions.Item>
                </Descriptions>
                <Descriptions title={<WeakTitle title="Freundlich" />}>
                    <Descriptions.Item label="k">{k} (mg/g)*(L/mg)^(1/n)</Descriptions.Item>
                    <Descriptions.Item label="1/n">{nth}</Descriptions.Item>
                </Descriptions>
            </>
        );
    })
);
