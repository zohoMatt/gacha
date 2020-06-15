import { EssentialProfileInput } from '../../mods/calculation/profile.maths';
import { BriefRecordType } from './base';
import { AdsorbentParams, ContaminantParams, ExpProfileParams } from '../../utils/storage/types';
import { FullRecordType } from '../../utils/storage/storage';
import { Calculation } from '../../mods/calculation/basic';

export function profileToInput(
    profile: BriefRecordType<ExpProfileParams>,
    adsorbent?: FullRecordType<AdsorbentParams>,
    contaminant?: FullRecordType<ContaminantParams>
): EssentialProfileInput | null {
    // Validate
    if (!adsorbent || !contaminant) {
        return null;
    }

    const { water, bed, adsorption } = profile;
    const { temperature } = water;
    const { diameter, length, flowrate, mass } = bed;
    const { initConcent, kinetics, freundlich } = adsorption;
    const { tortuosity, spdfr, surfaceDiffusion, filmDiffusion, poreDiffusion } = kinetics;
    const { k, nth } = freundlich;

    const { density, particleRadius, particlePorosity } = adsorbent.params;
    const { molarVolume } = contaminant.params;

    const { combine: c } = Calculation;
    return {
        waterTemperature: c(temperature),
        adsorbentDensity: c(density),
        adsorbentParticlePorosity: c(particlePorosity),
        adsorbentParticleRadius: c(particleRadius),
        bedDiameter: c(diameter),
        bedLength: c(length),
        bedFlowrate: c(flowrate),
        bedMass: c(mass),
        tortuosity: c(tortuosity),
        spdfr: c(spdfr),
        frendlichK: c(k),
        frendlichNth: c(nth),
        initConcent: c(initConcent),
        contaminantMolarVolume: c(molarVolume),
        surfaceDiffusion: surfaceDiffusion.correlation ? null : c(surfaceDiffusion),
        filmDiffusion: filmDiffusion.correlation ? null : c(filmDiffusion),
        poreDiffusion: poreDiffusion.correlation ? null : c(poreDiffusion)
    };
}
