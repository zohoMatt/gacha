import { evaluate, format } from 'mathjs';
import { CalculationResult } from '../basic';

export class ContaminantMaths {
    public static sqrCmPerMin = 'cm^2/min';

    /**
     *
     * @param dynamicViscosity  [g/cm*min]
     * @param molarVolume       [cm^3/mol]
     * @return                  [cm^2/min]
     */
    public static diffusivityInH2O(
        dynamicViscosity: number,
        molarVolume: number,
        fixed = 6
    ): CalculationResult {
        const res = evaluate(`4.44*10^-3/${dynamicViscosity}^1.14/${molarVolume}^0.589`);
        return {
            value: +format(res, { precision: fixed }),
            displayUnit: 'cm²/min',
            unit: ContaminantMaths.sqrCmPerMin
        };
    }
}
