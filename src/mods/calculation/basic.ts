import { format } from 'mathjs';

export interface CalculationResult {
    value: number;
    unit?: string;
    displayUnit: string;
}

// According to math.js built-in units
export const UnitTypes = {
    length: ['mm', 'cm', 'm', 'ft', 'in'],
    mass: ['mg', 'g', 'kg', 'lb'],
    density: ['g/mL', 'g/L', 'kg/L', 'lb/ft^2', 'lb/gal', 'kg/m^3', 'g/cm^3'],
    pressure: ['atm', 'Pa'],
    temperature: ['degC', 'K', 'degF', 'degR'],
    time: ['s', 'mins', 'hr', 'days'],
    concentration: ['ug/L', 'mg/L', 'g/L'],
    molarMass: ['ug/umol', 'mg/mmol', 'g/mol', 'kg/mol'],
    molarVolume: ['m^3/mol', 'L/mol', 'mL/mol']
};

export class Calculation {
    public static readonly FIXED = 4;

    public static readonly UNIT_TO_DISPLAY = {
        atm: 'atm',
        Pa: 'Pa',
        degC: '℃',
        K: 'K'
    };

    public static display(result: CalculationResult) {
        return `${result.value} ${result.displayUnit}`;
    }

    public static format(result: number, fixed?: number) {
        return +format(result, { precision: fixed || Calculation.FIXED });
    }
}
