import { Unit } from 'mathjs';

import { WaterMaths } from '../../../../../mods/calculation/independent/water.maths';
import { Calculation } from '../../../../../mods/calculation/basic';
import { QuantityValue } from '../../../../../utils/storage/storage';

export function calcDensityAndViscosity(temp: QuantityValue): [Unit, Unit] {
    return [
        WaterMaths.density(Calculation.combine(temp)),
        WaterMaths.dynamicViscosity(Calculation.combine(temp))
    ];
}
