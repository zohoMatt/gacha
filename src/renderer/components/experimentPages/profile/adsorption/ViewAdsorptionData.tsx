import * as React from 'react';
import { Link } from 'react-router-dom';
import { Descriptions } from 'antd';
import { observer, inject } from 'mobx-react';

import { WeakTitle } from '../../../common/elements/WeakTitle';
import { StoreInjectedProp } from '../../../../store';
import { ITEM_KEYS, NAV_KEYS } from '../../../nav/NavBar';
import { Calculation } from '../../../../../mods/calculation/basic';
import { AdsorptionInputParams, ContaminantData } from '../../../../../utils/storage/types';

export const ViewAdsorptionData: React.FunctionComponent<AdsorptionInputParams &
    StoreInjectedProp> = inject('store')(
    observer(data => {
        const { store, contaminant, initConcent, kinetics, freundlich } = data;

        // Hooks
        const [contaminantRecord, setContaminant] = React.useState({} as ContaminantData);
        React.useEffect(() => {
            if (contaminant)
                store!.contaminant
                    .queryWithKeyInList(contaminant)
                    .then(v => v && setContaminant(v));
        });

        const { filmDiffusion, surfaceDiffusion, poreDiffusion, spdfr, tortuosity } = kinetics;
        const { k, nth } = freundlich;

        // Correlation
        let corFD: any = null;
        let corPD: any = null;
        let corSD: any = null;
        try {
            const {
                filmDiffusion: f,
                poreDiffusion: p,
                surfaceDiffusion: s
            } = store!.exp.calculation!;
            corFD = f;
            corPD = p;
            corSD = s;
        } catch (e) {
            console.warn(e);
        }

        const { display: d, format: f } = Calculation;
        const EMPTY_PROMPT = '(Calculation error)';
        const corVal = (cor: any) => (cor ? d(f(cor)) : EMPTY_PROMPT);

        return (
            <>
                <Descriptions>
                    <Descriptions.Item label="Contaminant">
                        {contaminantRecord.name ? (
                            <Link
                                to={`/workspace/${NAV_KEYS.Database}/${ITEM_KEYS.Contaminant}?key=${contaminant}`}>
                                {contaminantRecord.name}
                            </Link>
                        ) : (
                            'N/A'
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Initial Concentration">
                        {d(initConcent)}
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions title={<WeakTitle title="Kinetics" />}>
                    <Descriptions.Item label="Film Diffusion">
                        {filmDiffusion.correlation
                            ? `${corVal(corFD)} (Gnielinski)`
                            : `${d(filmDiffusion)} (User Input)`}
                    </Descriptions.Item>
                    <Descriptions.Item label="Surface Diffusion">
                        {surfaceDiffusion.correlation
                            ? `${corVal(corSD)} (Sontheimer)`
                            : `${d(surfaceDiffusion)} (User Input)`}
                    </Descriptions.Item>
                    <Descriptions.Item label="Pore Diffusion">
                        {poreDiffusion.correlation
                            ? `${corVal(corPD)} (Hayduk & Laudie)`
                            : `${d(poreDiffusion)} (User Input)`}
                    </Descriptions.Item>
                    <Descriptions.Item label="SPDFR">{d(spdfr)}</Descriptions.Item>
                    <Descriptions.Item label="Tortuosity">{d(tortuosity)}</Descriptions.Item>
                </Descriptions>
                <Descriptions title={<WeakTitle title="Freundlich" />}>
                    <Descriptions.Item label="k">{k.value} (mg/g)*(L/mg)^(1/n)</Descriptions.Item>
                    <Descriptions.Item label="1/n">{d(nth)}</Descriptions.Item>
                </Descriptions>
            </>
        );
    })
);
