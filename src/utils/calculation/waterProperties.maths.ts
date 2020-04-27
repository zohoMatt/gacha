import { evaluate, format, unit } from 'mathjs';

export class Water {
    public static kgPerCubicMeter = 'kg/m^3';

    public static gPerCubicCentimeter = 'g/cm^3';

    /**
     * @param temperature   [℃]
     * @param fixed
     * @return              [g/cm³]
     */
    public static density(temperature: number, fixed = 4): number {
        const kgpm3 = evaluate(
            `-0.000000136017092*${temperature}^4 + 0.000042945572506*${temperature}^3 - 0.007624720184594*${temperature}^2 + 0.054223297911449*${temperature} + 999.85329403558`
        );
        const gpcm3 = unit(kgpm3, Water.kgPerCubicMeter).toNumber(Water.gPerCubicCentimeter);
        return +format(gpcm3, { precision: fixed });
    }

    /**
     * @param temperature   [℃]
     * @param fixed
     * @return              [g/cm·s]
     */
    public static viscosity(temperature: number, fixed = 4): number {
        const kv = evaluate(
            `0.00000000000014005*${temperature}^4 - 0.000000000020716*${temperature}^3 + 0.0000000013967*${temperature}^2 - 0.000000059867*${temperature} + 0.0000017852`
        );
        const density = unit(Water.density(temperature), Water.gPerCubicCentimeter).toNumber(
            Water.kgPerCubicMeter
        );
        const dv = evaluate(`${density}*${kv}*10`);
        return +format(dv, { precision: fixed });
    }
}
