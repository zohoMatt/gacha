import { divide, evaluate, multiply, unit, Unit } from 'mathjs';
import { EssentialProfileInput, ProfileCalculationResults } from './types';

export class ProfileMaths implements ProfileCalculationResults {
    private readonly input: EssentialProfileInput;

    constructor(inputParams: EssentialProfileInput) {
        this.input = inputParams;
    }

    /** Bed * */

    public get bedCrossSectionalArea(): Unit {
        const { bedDiameter } = this.input;
        return unit(evaluate(`pi * (${bedDiameter})^2 / 4`));
    }

    public get bedVolume(): Unit {
        const { bedLength } = this.input;
        const area = this.bedCrossSectionalArea.toString();
        return unit(evaluate(`(${area}) * ${bedLength}`));
    }

    public get bedDensity(): Unit {
        const { bedMass } = this.input;
        const vb = this.bedVolume.toString();
        return unit(evaluate(`(${bedMass})/(${vb})`));
    }

    public get bedPorosity(): Unit {
        const bed = this.bedDensity.toString();
        const { adsorbentDensity } = this.input;
        return unit(evaluate(`1 - (${bed})/(${adsorbentDensity})`));
    }

    public get ebct(): Unit {
        const { bedFlowrate } = this.input;
        return divide(this.bedVolume, unit(bedFlowrate));
    }

    public get hlr(): Unit {
        const { bedFlowrate } = this.input;
        return divide(unit(bedFlowrate), this.bedCrossSectionalArea);
    }

    public get interstitialVelocity(): Unit {
        return divide(this.hlr, this.bedPorosity);
    }

    /** Water * */

    public get waterDensity(): Unit {
        const { waterTemperature } = this.input;
        const t = unit(waterTemperature).toNumber('degC');
        const kgpm3 = evaluate(
            `-0.000000136017092*${t}^4 + 0.000042945572506*${t}^3 - 0.007624720184594*${t}^2 + 0.054223297911449*${t} + 999.85329403558`
        );
        return unit(kgpm3, 'kg/m^3');
    }

    public get waterKineticViscosity(): Unit {
        const { waterTemperature } = this.input;
        const t = unit(waterTemperature).toNumber('degC');
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
        const { contaminantMolarVolume } = this.input;
        const numericVb = unit(contaminantMolarVolume).toNumber('cm^3/mol');
        return unit(evaluate(`4.44*10^-3/${numericDv}^1.14/${numericVb}^0.589`), 'cm^2/mins');
    }

    /** Others * */

    // [WARNING] math.js bug: calculation can transform type Unit to Number, in which case static type check is not valid
    public get nReynolds(): Unit {
        const { adsorbentParticleRadius } = this.input;
        return unit(
            divide(
                multiply(unit(adsorbentParticleRadius), this.hlr),
                multiply(this.waterKineticViscosity, this.bedPorosity)
            ).toString()
        );
    }

    public get nSchmidt(): Unit {
        return unit(divide(this.waterKineticViscosity, this.diffusivityInWater).toString());
    }

    public get multipliedScRe(): Unit {
        return unit(multiply(this.nReynolds, this.nSchmidt).toString());
    }

    public get dispersionCoeffi(): Unit {
        const nDw = this.diffusivityInWater.toNumber('cm^2/mins');
        const nSc = this.nSchmidt;
        const nRe = this.nReynolds;
        if (this.multipliedScRe.toNumber('') < 260) {
            return unit(evaluate(`${nDw}*(0.67+0.5*(${nSc}*${nRe})^1.2)`), 'cm^2/mins');
        }
        return unit(evaluate(`1.8*${nDw}*(${nSc}*${nRe})`), 'cm^2/mins');
    }

    public get nPeclet(): Unit {
        const { bedLength } = this.input;
        return unit(
            divide(
                multiply(unit(bedLength), this.hlr),
                multiply(this.dispersionCoeffi, this.bedPorosity)
            ).toString()
        );
    }

    public get filmDiffusion(): Unit {
        // User Input
        const { filmDiffusion } = this.input;
        if (filmDiffusion) return unit(filmDiffusion);

        const { adsorbentParticleRadius } = this.input;
        const nSc = this.nSchmidt.toNumber('');
        const nRe = this.nReynolds.toNumber('');
        const nDp = unit(adsorbentParticleRadius).toNumber('cm');
        const nDw = this.diffusivityInWater.toNumber('cm^2/mins');
        const nPorosity = this.bedPorosity.toNumber('');
        return unit(
            evaluate(
                `(1+ 1.5 * (1-${nPorosity})) * ${nDw} * (2 + 0.664 * ${nRe}^0.5 * ${nSc}^(1/3) )/${nDp}`
            ),
            'cm/mins'
        );
    }

    public get nStanton(): Unit {
        const { adsorbentParticleRadius: rp } = this.input;
        const { bedLength } = this.input;
        const kf = this.filmDiffusion.toString();
        const p = this.bedPorosity.toString();
        const hlr = this.hlr.toString();
        return unit(evaluate(`(2*(${kf})*(${bedLength.toString()})*(1-${p}))/((${rp})*(${hlr}))`));
    }

    public get mStanton(): Unit {
        return unit(divide(this.nStanton, this.bedPorosity).toString());
    }

    // Unit is tricky
    public get adsorptionCap(): Unit {
        const { frendlichK } = this.input;
        const { frendlichNth } = this.input;
        const { initConcent } = this.input;
        const c = unit(initConcent).toNumber('ug/L');
        return unit(evaluate(`${frendlichK}*${c}^${frendlichNth}`), 'ug/g');
    }

    public get surfaceSoluteDistParam(): Unit {
        const { initConcent } = this.input;
        return unit(
            divide(
                multiply(this.bedDensity, this.adsorptionCap),
                multiply(this.bedPorosity, unit(initConcent))
            ).toString()
        );
    }

    public get poreSoluteDistParam() {
        const { adsorbentParticlePorosity } = this.input;
        const pb = this.bedPorosity.toString();
        return unit(evaluate(`(${adsorbentParticlePorosity}) * (1 - ${pb}) / ${pb}`));
    }

    public get poreDiffusion(): Unit {
        // User Input
        const { poreDiffusion } = this.input;
        if (poreDiffusion) return unit(poreDiffusion);

        const { tortuosity } = this.input;
        return divide(this.diffusivityInWater, unit(tortuosity));
    }

    public get surfaceDiffusion(): Unit {
        // User Input
        const { surfaceDiffusion } = this.input;
        if (surfaceDiffusion) return unit(surfaceDiffusion);

        const { spdfr } = this.input;
        const dw = this.diffusivityInWater.toString();
        const {
            adsorbentParticlePorosity: ep,
            initConcent: c0,
            tortuosity: t,
            adsorbentDensity: dens
        } = this.input;
        const qe = this.adsorptionCap.toString();
        return unit(
            evaluate(`(${spdfr}) * (${dw}) * (${ep}) * (${c0}) / ((${t}) * (${dens}) * (${qe}))`)
        );
    }

    public get surfaceDiffusionMod(): Unit {
        const ds = this.surfaceDiffusion.toString();
        const dgs = this.surfaceSoluteDistParam.toString();
        const { bedLength: l, adsorbentParticleRadius: dp } = this.input;
        const e = this.bedPorosity.toString();
        const hlr = this.hlr.toString();
        return unit(evaluate(`4 *(${ds}) * (${dgs}) * (${l}) * (${e}) / ((${dp})^2 * (${hlr}))`));
    }

    public get poreDiffusionMod(): Unit {
        const pd = this.poreDiffusion.toString();
        const dgp = this.poreSoluteDistParam.toString();
        const { bedLength: l, adsorbentParticleRadius: dp } = this.input;
        const e = this.bedPorosity.toString();
        const hlr = this.hlr.toString();
        return unit(evaluate(`4 *(${pd}) * (${dgp}) * (${l}) * (${e}) / ((${dp})^2 * (${hlr}))`));
    }

    public get nPoreBiot(): Unit {
        return unit(divide(this.nStanton, this.poreDiffusionMod).toString());
    }

    public get mPoreBiot(): Unit {
        return unit(divide(this.mStanton, this.poreDiffusionMod).toString());
    }

    public get nSurfaceBiot(): Unit {
        return unit(divide(this.nStanton, this.surfaceDiffusionMod).toString());
    }

    public get mSurfaceBiot(): Unit {
        return unit(divide(this.mStanton, this.surfaceDiffusionMod).toString());
    }
}
