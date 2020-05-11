import { chain, unit, divide, evaluate, multiply, Unit } from 'mathjs';

import {
    AdsorptionInputParams,
    BedInputParams,
    CorrelationOrInput,
    PsdmInputParams,
    WaterInputParams
} from '../../renderer/store/experiment.store';
import { AdsorbentParams } from '../../renderer/store/adsorbent.store';
import { ContaminantParams } from '../../renderer/store/contaminant.store';

// todo Will support multiple units in the future
// todo Here is a temporary workaround
type AdsorbentQuantityValues = { [key in keyof AdsorbentParams]: string | Unit };
type WaterQuantityValues = { [key in keyof WaterInputParams]: string | Unit };
type BedQuantityValues = { [key in keyof BedInputParams]: string | Unit };
type ContaminantQuantityValues = { [key in keyof ContaminantParams]: string | Unit };
type AdsorptionQuantityValues = { [key in keyof AdsorptionInputParams]: string | Unit };
type PsdmQuantityValues = { [key in keyof PsdmInputParams]: string | Unit };

export interface BasicInput {
    adsorbent: AdsorbentQuantityValues;
    water: WaterQuantityValues;
    bed: BedQuantityValues;
    contaminant: ContaminantQuantityValues;
    adsorption: {
        contaminant: string;
        freundlich: {
            k: string | Unit;
            nth: string | Unit;
        };
        kinetics: {
            filmDiffusion: CorrelationOrInput; // cm/s,
            surfaceDiffusion: CorrelationOrInput; // cm^2/s
            poreDiffusion: CorrelationOrInput; // cm^2/s
            spdfr: string | Unit;
            tortuosity: string | Unit;
        };
    };
    psdm: PsdmQuantityValues;
}

export class ProfileMaths {
    private input: BasicInput;

    constructor(inputParams: BasicInput) {
        this.input = inputParams;
    }

    /** Bed * */

    public get bedCrossSectionalArea(): Unit {
        const { diameter } = this.input.bed;
        return unit(evaluate(`pi * (${diameter.toString()})^2 / 4`));
    }

    public get bedVolume(): Unit {
        const { length } = this.input.bed;
        const area = this.bedCrossSectionalArea.toString();
        return unit(evaluate(`(${area}) * ${length.toString()}`));
    }

    public get bedDensity(): Unit {
        const { mass } = this.input.bed;
        const m = mass.toString();
        const vb = this.bedVolume.toString();
        return unit(evaluate(`(${m})/(${vb})`));
    }

    public get bedPorosity(): Unit {
        const bed = this.bedDensity.toString();
        const { density } = this.input.adsorbent;
        return unit(evaluate(`1 - (${bed})/(${density.toString()})`));
    }

    public get ebct(): Unit {
        const { flowrate } = this.input.bed;
        return divide(this.bedVolume, unit(flowrate.toString()));
    }

    public get hlr(): Unit {
        const { flowrate } = this.input.bed;
        return divide(unit(flowrate.toString()), this.bedCrossSectionalArea);
    }

    public get interstitialVelocity(): Unit {
        return divide(this.hlr, this.bedPorosity);
    }

    /** Water * */

    public get waterDensity(): Unit {
        const { temperature } = this.input.water;
        const t = unit(temperature.toString()).toNumber('degC');
        const kgpm3 = evaluate(
            `-0.000000136017092*${t}^4 + 0.000042945572506*${t}^3 - 0.007624720184594*${t}^2 + 0.054223297911449*${t} + 999.85329403558`
        );
        return unit(kgpm3, 'kg/m^3');
    }

    public get waterKineticViscosity(): Unit {
        const { temperature } = this.input.water;
        const t = unit(temperature.toString()).toNumber('degC');
        return unit(
            evaluate(
                `0.00000000000014005*${t}^4 - 0.000000000020716*${t}^3 + 0.0000000013967*${t}^2 - 0.000000059867*${t} + 0.0000017852`
            ),
            'm^2/s'
        );
    }

    public get waterDynamicViscosity(): Unit {
        return multiply(this.waterDensity, this.waterKineticViscosity);
    }

    public get diffusivityInWater(): Unit {
        const numericDv = this.waterDynamicViscosity.toNumber('g/(cm min)');
        const { molarVolume } = this.input.contaminant;
        const numericVb = unit(molarVolume.toString()).toNumber('cm^3/mol');
        return unit(evaluate(`4.44*10^3/${numericDv}^1.14/${numericVb}^0.589`), 'cm^2/min');
    }

    /** Others * */
    public get nReynolds(): Unit {
        const { particleRadius } = this.input.adsorbent;
        return divide(
            multiply(unit(particleRadius.toString()), this.hlr),
            multiply(this.waterKineticViscosity, this.bedPorosity)
        );
    }

    public get nSchmidt(): Unit {
        return divide(this.waterKineticViscosity, this.diffusivityInWater);
    }

    public get multipliedScRe(): Unit {
        return multiply(this.nReynolds, this.nSchmidt);
    }

    public get dispersionCoeffi(): Unit {
        const nDw = this.diffusivityInWater.toNumber('g/(cm min)');
        const nSc = this.nSchmidt.toNumber('');
        const nRe = this.nReynolds.toNumber('');
        if (this.multipliedScRe.toNumber('') < 260) {
            return unit(evaluate(`${nDw}*(0.67+0.5*(${nSc}*${nRe})^1.2)`), 'cm^2/min');
        } 
            return unit(evaluate(`1.8*${nDw}*(${nSc}*${nRe})`), 'cm^2/min');
        
    }

    public get nPeclet(): Unit {
        const { length } = this.input.bed;
        return divide(
            multiply(unit(length.toString()), this.hlr),
            multiply(this.dispersionCoeffi, this.bedPorosity)
        );
    }

    public get filmMassTransferCoeffi(): Unit {
        const { particleRadius } = this.input.adsorbent;
        const nSc = this.nSchmidt.toNumber('');
        const nRe = this.nReynolds.toNumber('');
        const nDp = unit(particleRadius.toString()).toNumber('cm');
        const nDw = this.diffusivityInWater.toNumber('cm^2/min');
        const nPorosity = this.bedPorosity.toNumber('');
        return unit(
            evaluate(`(1+1.5*(1-${nPorosity})*${nDw}*(2+0.664*${nRe}^0.5*${nSc}^1/3)/${nDp}`),
            'cm/min'
        );
    }

    public get nStanton(): Unit {
        const { particleRadius } = this.input.adsorbent;
        const rp = particleRadius.toString();
        const { length } = this.input.bed;
        const kf = this.filmMassTransferCoeffi.toString();
        const p = this.bedPorosity.toString();
        const hlr = this.hlr.toString();
        return unit(evaluate(`2*(${kf})*(${length.toString()})*(1-${p})/((${rp})*(${hlr}))`));
    }

    public get mStanton(): Unit {
        return divide(this.nStanton, this.bedPorosity);
    }

    // Unit is tricky
    public get adsorptionCap(): Unit {
        const { freundlich } = this.input.adsorption;
        const k = +freundlich.k.toString();
        const nth = +freundlich.nth.toString();
        const { initConcent } = this.input.contaminant;
        const c = unit(initConcent.toString()).toNumber('ug/L');
        return unit(evaluate(`${k}*${c}^${nth}`), 'ug/g');
    }

    public get surfaceSoluteDistParam(): Unit {
        const { initConcent } = this.input.contaminant;
        return divide(
            multiply(this.bedDensity, this.adsorptionCap),
            multiply(this.bedPorosity, unit(initConcent.toString()))
        );
    }

    public get poreSoluteDistParam() {
        const { particlePorosity } = this.input.adsorbent;
        const pb = this.bedPorosity.toString();
        return unit(evaluate(`(${particlePorosity.toString()}) * (1 - ${pb}) / ${pb}`));
    }

    public get poreDiffusion(): Unit {
        const { tortuosity } = this.input.adsorption.kinetics;
        return divide(this.diffusivityInWater, unit(tortuosity.toString()));
    }

    public get surfaceDiffusion(): Unit {
        const spdfr = this.input.adsorption.kinetics.spdfr.toString();
        const dw = this.diffusivityInWater.toString();
        const ep = this.input.adsorbent.particlePorosity.toString();
        const c0 = this.input.contaminant.initConcent.toString();
        const t = this.input.adsorption.kinetics.tortuosity.toString();
        const dens = this.input.adsorbent.density.toString();
        const qe = this.adsorptionCap.toString();
        return unit(
            evaluate(`(${spdfr}) * (${dw}) * (${ep}) * (${c0}) / ((${t}) * (${dens}) * (${qe}))`)
        );
    }

    public get surfaceDiffusionMod(): Unit {
        const ds = this.surfaceDiffusion.toString();
        const dgs = this.surfaceSoluteDistParam.toString();
        const l = this.input.bed.length.toString();
        const e = this.bedPorosity.toString();
        const dp = this.input.adsorbent.particleRadius.toString();
        const hlr = this.hlr.toString();
        return unit(evaluate(`4 *(${ds}) * (${dgs}) * (${l}) * (${e}) / ((${dp})^2 * (${hlr}))`));
    }

    public get poreDiffusionMod(): Unit {
        const dgs = this.surfaceSoluteDistParam;
        const dgp = this.poreSoluteDistParam;
        return chain(this.surfaceDiffusionMod)
            .divide(dgs)
            .multiply(dgp)
            .done();
    }

    public get nPoreBiot(): Unit {
        return divide(this.nStanton, this.poreDiffusionMod);
    }

    public get mPoreBiot(): Unit {
        return divide(this.mStanton, this.poreDiffusionMod);
    }

    public get nSurfaceBiot(): Unit {
        return divide(this.nStanton, this.surfaceDiffusionMod);
    }

    public get mSurfaceBiot(): Unit {
        return divide(this.mStanton, this.poreDiffusionMod);
    }
}
