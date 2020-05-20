import { format, unit as mathUnit, Unit } from 'mathjs';
import { QuantityValue } from '../../renderer/store/base';

export class Calculation {
    public static readonly FIXED = 4;

    public static readonly UNIT_TO_DISPLAY = {
        atm: 'atm',
        Pa: 'Pa',
        degC: '℃',
        K: 'K'
    };

    // todo More functional
    protected static displayUnit(unit: string | Unit) {
        return unit
            .toString()
            .replace(/\^3/g, '³')
            .replace(/\^2/g, '²')
            .replace(/degC/g, '℃')
            .replace(/degF/g, '℉')
            .replace(/mins/g, 'min')
            .replace(/ug/g, 'μg');
    }

    public static display(result: QuantityValue | string | Unit, fixed = 6) {
        const { displayUnit, format: formatResult } = Calculation;
        if (
            (result as QuantityValue).unit === undefined ||
            (result as QuantityValue).value === undefined
        ) {
            return displayUnit(formatResult(result as string | Unit, fixed));
        }
        const { unit, value } = result as any;
        return unit
            ? `${formatResult(value, fixed)} ${displayUnit(unit)}`
            : formatResult(value, fixed);
    }

    public static combine(result: QuantityValue): string {
        return result.value + result.unit;
    }

    public static format(result: number | string | Unit, fixed = 6): string {
        return format(mathUnit(result.toString()), { precision: fixed || Calculation.FIXED });
    }
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
