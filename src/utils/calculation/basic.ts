export interface CalculationResult {
    value: number;
    unit?: string;
    displayUnit: string;
}

export class Calculation {
    public static display(result: CalculationResult) {
        return `${result.value} ${result.displayUnit}`;
    }
}
