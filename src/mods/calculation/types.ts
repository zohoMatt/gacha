import { Unit } from 'mathjs';

export interface EssentialProfileInput {
    waterTemperature: string;
    adsorbentDensity: string;
    adsorbentParticlePorosity: string;
    adsorbentParticleRadius: string;
    bedDiameter: string;
    bedLength: string;
    bedFlowrate: string;
    bedMass: string;
    tortuosity: string;
    spdfr: string;
    frendlichK: string;
    frendlichNth: string;
    initConcent: string;
    contaminantMolarVolume: string;
    surfaceDiffusion: string | null;
    poreDiffusion: string | null;
    filmDiffusion: string | null;
}

export interface ProfileCalculationResults {
    bedCrossSectionalArea: Unit | string;
    bedVolume: Unit | string;
    bedDensity: Unit | string;
    bedPorosity: Unit | string;
    ebct: Unit | string;
    hlr: Unit | string;
    interstitialVelocity: Unit | string;
    waterDensity: Unit | string;
    waterKineticViscosity: Unit | string;
    waterDynamicViscosity: Unit | string;
    diffusivityInWater: Unit | string;
    nReynolds: Unit | string;
    nSchmidt: Unit | string;
    multipliedScRe: Unit | string;
    dispersionCoeffi: Unit | string;
    nPeclet: Unit | string;
    nStanton: Unit | string;
    mStanton: Unit | string;
    adsorptionCap: Unit | string;
    surfaceSoluteDistParam: Unit | string;
    poreSoluteDistParam: Unit | string;
    poreDiffusion: Unit | string;
    surfaceDiffusion: Unit | string;
    filmDiffusion: Unit | string;
    surfaceDiffusionMod: Unit | string;
    poreDiffusionMod: Unit | string;
    nPoreBiot: Unit | string;
    mPoreBiot: Unit | string;
    nSurfaceBiot: Unit | string;
    mSurfaceBiot: Unit | string;
}

export type FullProfile = EssentialProfileInput & ProfileCalculationResults;

export interface ColumnTitleProps {
    name: string;
    unit: string;
}
