import { Unit } from 'mathjs';

import { WaterMaths } from '../../../../../mods/calculation/independent/water.maths';
import { QuantityValue } from '../../../../store/base';
import { Calculation } from '../../../../../mods/calculation/basic';

export function calcDensityAndViscosity(temp: QuantityValue): [Unit, Unit] {
    return [
        WaterMaths.density(Calculation.combine(temp)),
        WaterMaths.dynamicViscosity(Calculation.combine(temp))
    ];
}
