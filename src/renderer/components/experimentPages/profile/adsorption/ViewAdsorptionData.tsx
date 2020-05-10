import * as React from 'react';
import { Descriptions } from 'antd';

import { AdsorptionInputParams } from '../../../../store/experiment.store';
import { WeakTitle } from '../../../common/elements/WeakTitle';

export const ViewAdsorptionData: React.FunctionComponent<AdsorptionInputParams> = data => {
    const { kinetics, freundlich } = data;

    const { filmDiffusion, poreDiffusion, surfaceDiffusion, spdfr, tortuosity } = kinetics;
    const { k, nth } = freundlich;

    return (
        <>
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
};
