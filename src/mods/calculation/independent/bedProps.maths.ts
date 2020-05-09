import { evaluate, unit, format, multiply, divide } from 'mathjs';

import { CalculationResult } from '../basic';

export class FixedBed {
    /**
     * @param diameter  [cm]
     * @param fixed
     */
    public static crossSectionalArea(diameter: number, fixed = 6): CalculationResult {
        return {
            value: +format(evaluate(`pi * ${diameter}^2 / 4`), { precision: fixed }),
            unit: 'cm^2',
            displayUnit: 'cm²'
        };
    }

    /**
     * @param length    [cm]
     * @param diameter  [cm]
     * @param fixed
     */
    public static volume(length: number, diameter: number, fixed = 6): CalculationResult {
        const area = FixedBed.crossSectionalArea(diameter, fixed + 1).value;
        return {
            value: +format(multiply(area, length), { precision: fixed }),
            unit: 'cm^3',
            displayUnit: 'cm³'
        };
    }

    public static density(
        mass: number,
        length: number,
        diameter: number,
        fixed = 6
    ): CalculationResult {
        const volume = FixedBed.volume(length, diameter, fixed + 1).value;
        return {
            value: +format(divide(mass, volume), { precision: fixed }),
            displayUnit: 'g/mL'
        };
    }
}
