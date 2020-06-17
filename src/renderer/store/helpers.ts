import { EssentialProfileInput } from '../../mods/calculation/profile.maths';
import { BriefRecordType } from './base';
import {
    AdsorbentParams,
    ContaminantParams,
    ExpProfileParams,
    FullRecordType
} from '../../utils/storage/types';
import { Calculation } from '../../mods/calculation/basic';

export function profileToInput(
    profile: BriefRecordType<ExpProfileParams>,
    adsorbent?: FullRecordType<AdsorbentParams>,
    contaminant?: FullRecordType<ContaminantParams>
): EssentialProfileInput | null {
    const { water, bed, adsorption } = profile;
    const { temperature } = water;
    const { diameter, length, flowrate, mass } = bed;
    const { initConcent, kinetics, freundlich } = adsorption;
    const { tortuosity, spdfr, surfaceDiffusion, filmDiffusion, poreDiffusion } = kinetics;
    const { k, nth } = freundlich;

    // fixme
    const { density, particleRadius, particlePorosity } = adsorbent
        ? adsorbent.params
        : ({} as any);
    const { molarVolume } = contaminant ? contaminant.params : ({} as any);

    const INVALID = '(Invalid)';
    const { combine: c } = Calculation;
    return {
        waterTemperature: c(temperature),
        adsorbentDensity: density ? c(density) : INVALID,
        adsorbentParticlePorosity: particlePorosity ? c(particlePorosity) : INVALID,
        adsorbentParticleRadius: particleRadius ? c(particleRadius) : INVALID,
        bedDiameter: c(diameter),
        bedLength: c(length),
        bedFlowrate: c(flowrate),
        bedMass: c(mass),
        tortuosity: c(tortuosity),
        spdfr: c(spdfr),
        frendlichK: c(k),
        frendlichNth: c(nth),
        initConcent: c(initConcent),
        contaminantMolarVolume: molarVolume ? c(molarVolume) : INVALID,
        surfaceDiffusion: surfaceDiffusion.correlation ? null : c(surfaceDiffusion),
        filmDiffusion: filmDiffusion.correlation ? null : c(filmDiffusion),
        poreDiffusion: poreDiffusion.correlation ? null : c(poreDiffusion)
    };
}

export function fullRecordToBrief<T>(record: FullRecordType<T>): BriefRecordType<T> {
    const { key, name, description, params } = record;
    return {
        key,
        name,
        description,
        ...params
    };
}
