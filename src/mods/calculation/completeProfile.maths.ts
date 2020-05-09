import { evaluate, format } from 'mathjs';

import { AdsorbentParams } from '../../renderer/store/adsorbent.store';
import { WaterParams } from '../../renderer/store/water.store';
import { ContaminantParams } from '../../renderer/store/contaminant.store';
import { BedParams } from '../../renderer/store/bed.store';
import { AdsorptionParams } from '../../renderer/store/adsorption.store';
import { PsdmParams } from '../../renderer/store/psdm.store';
import { QuantityValue } from '../../renderer/store/base';

export interface ProcessedProfile {
    interstitialVelocity: QuantityValue;
    reynolds: QuantityValue;
    schmidt: QuantityValue;
    scMultiplyRe: QuantityValue;
    dispersionCoefficient: QuantityValue;
    peclet: QuantityValue;
    filmDiffusion: QuantityValue;
    stanton: QuantityValue;
    modStanton: QuantityValue;
    adsorptionCap: QuantityValue;
    surfaceSoluteDistParam: QuantityValue;
    poreSoluteDistParam: QuantityValue;
    poreDiffusion: QuantityValue;
    surfaceDiffusion: QuantityValue;
    surfaceDiffMod: QuantityValue;
    poreDiffMod: QuantityValue;
    poreBiot: QuantityValue;
    modPoreBiot: QuantityValue;
    surfaceBiot: QuantityValue;
    modSurfaceBiot: QuantityValue;
}

export interface BasicProfile {
    water: WaterParams;
    adsorbent: AdsorbentParams;
    adsorption: AdsorptionParams;
    contaminant: ContaminantParams;
    bed: BedParams;
    simulation: PsdmParams;
}

export class CompleteProfileMaths {
    public basic: BasicProfile;

    public processed: ProcessedProfile;

    constructor(input: BasicProfile) {
        this.basic = input;
    }
}
