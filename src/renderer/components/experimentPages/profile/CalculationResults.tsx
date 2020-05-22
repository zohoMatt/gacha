import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Descriptions, Divider, Typography } from 'antd';
import { Store } from '../../../store/init';
import { Calculation } from '../../../../mods/calculation/basic';

export interface CalculationResultsProps {
    store?: Store;
}

export const CalculationResults: React.FC<CalculationResultsProps> = inject('store')(
    observer(({ store }) => {
        const { calculation } = store!.exp;

        try {
            const {
                bedCrossSectionalArea,
                bedVolume,
                bedDensity,
                bedPorosity,
                hlr,
                ebct,
                interstitialVelocity,
                nReynolds,
                dispersionCoeffi,
                nPeclet,
                nPoreBiot,
                mPoreBiot
            } = calculation!;
        } catch (e) {
            console.warn(e);
            return (
                <Typography.Text type="danger" strong>
                    Invalid Parameters
                </Typography.Text>
            );
        }
        const {
            bedCrossSectionalArea,
            bedVolume,
            bedDensity,
            bedPorosity,
            hlr,
            ebct,
            interstitialVelocity,
            nReynolds,
            dispersionCoeffi,
            nPeclet,
            nPoreBiot,
            mPoreBiot
        } = calculation!;
        const { display: d, format: f } = Calculation;

        return (
            <>
                <Divider orientation="center">Calculation Results</Divider>
                <Descriptions>
                    <Descriptions.Item label="Bed Density">{d(f(bedDensity))}</Descriptions.Item>
                    <Descriptions.Item label="Bed Porosity">{d(f(bedPorosity))}</Descriptions.Item>
                    <Descriptions.Item label="Cross-Sectional Area">
                        {d(f(bedCrossSectionalArea))}
                    </Descriptions.Item>
                    <Descriptions.Item label="Bed Volume">{d(f(bedVolume))}</Descriptions.Item>
                    <Descriptions.Item label="EBCT">{d(f(ebct))}</Descriptions.Item>
                    <Descriptions.Item label="HLR">{d(f(hlr))}</Descriptions.Item>
                    <Descriptions.Item label="Superficial Velocity">xxx</Descriptions.Item>
                    <Descriptions.Item label="Interstitial Velocity">
                        {d(f(interstitialVelocity))}
                    </Descriptions.Item>
                    <Descriptions.Item label="Dispersion Coefficient">
                        {d(f(dispersionCoeffi))}
                    </Descriptions.Item>
                    <Descriptions.Item label="Reynolds Number">{d(f(nReynolds))}</Descriptions.Item>
                    <Descriptions.Item label="Peclet Number">{d(f(nPeclet))}</Descriptions.Item>
                    <Descriptions.Item label="Pore Biot Number">
                        {d(f(nPoreBiot))}
                    </Descriptions.Item>
                    <Descriptions.Item label="Mod. Pore Biot Number">
                        {d(f(mPoreBiot))}
                    </Descriptions.Item>
                </Descriptions>
            </>
        );
    })
);
