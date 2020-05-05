import { BaseValidator, BasicInfoRules, RulesDictionary } from './base.validator';

export class WaterValidator extends BaseValidator {
    readonly BASIC_RULES: RulesDictionary = {
        ...BasicInfoRules,
        pressure: {
            label: 'Pressure',
            rules: [
                { type: 'required' },
                { type: 'number', limit: 'min', values: [{ value: 0, include: false }] }
            ]
        },
        temperature: {
            label: 'Temperature',
            rules: [
                { type: 'required' },
                {
                    type: 'number',
                    limit: 'range',
                    values: [
                        { value: 0, include: true },
                        { value: 100, include: true }
                    ]
                }
            ]
        }
    };

    readonly DEPENDENT_RULES_RELATED_KEYS: string[] = [];

    protected checkDependentVars(
        getFieldValue: (field: string) => any,
        name: string,
        value: any,
        reference?: any
    ): string {
        return '';
    }
}
