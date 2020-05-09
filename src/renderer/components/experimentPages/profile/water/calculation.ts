import { Calculation } from '../../../../../mods/calculation/basic';
import { WaterMaths } from '../../../../../mods/calculation/independent/water.maths';

export function calcDensityAndViscosity(temp: number) {
    const densityVal = `${Calculation.format(
        WaterMaths.density(`${temp} degC`).toNumber('g/cm^3')
    )} g/cm³`;
    const viscosityVal = `${Calculation.format(
        WaterMaths.dynamicViscosity(`${temp} degC`).toNumber('g/(cm s)')
    )} g/cm·s`;
    return [densityVal, viscosityVal];
}
