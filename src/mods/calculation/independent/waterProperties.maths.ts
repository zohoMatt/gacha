import { evaluate, format, unit } from 'mathjs';
import { CalculationResult } from '../basic';

export class WaterMaths {
    public static kgPerCubicMeter = 'kg/m^3';

    public static gPerCubicCentimeter = 'g/cm^3';

    /**
     * @param temperature   [℃]
     * @param fixed
     * @return              [g/cm³]
     */
    public static density(temperature: number, fixed = 4): CalculationResult {
        const kgpm3 = evaluate(
            `-0.000000136017092*${temperature}^4 + 0.000042945572506*${temperature}^3 - 0.007624720184594*${temperature}^2 + 0.054223297911449*${temperature} + 999.85329403558`
        );
        const gpcm3 = unit(kgpm3, WaterMaths.kgPerCubicMeter).toNumber(
            WaterMaths.gPerCubicCentimeter
        );
        return {
            value: +format(gpcm3, { precision: fixed }),
            unit: WaterMaths.gPerCubicCentimeter,
            displayUnit: 'g/cm³'
        };
    }

    /**
     * @param temperature   [℃]
     * @param fixed
     */
    public static dynamicViscosity(temperature: number, fixed = 4): CalculationResult {
        const kv = evaluate(
            `0.00000000000014005*${temperature}^4 - 0.000000000020716*${temperature}^3 + 0.0000000013967*${temperature}^2 - 0.000000059867*${temperature} + 0.0000017852`
        );
        const density = unit(
            WaterMaths.density(temperature).value,
            WaterMaths.gPerCubicCentimeter
        ).toNumber(WaterMaths.kgPerCubicMeter);
        const dv = evaluate(`${density}*${kv}*10`);
        return {
            value: +format(dv, { precision: fixed }),
            displayUnit: 'g/cm·s'
        };
    }
}
