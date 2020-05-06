import { BaseValidator, BasicInfoRules, RulesDictionary } from './base.validator';

export class ContamintantValidator extends BaseValidator {
    public readonly BASIC_RULES: RulesDictionary = {
        ...BasicInfoRules
    };

    public readonly DEPENDENT_RULES_RELATED_KEYS: string[] = [];

    protected checkDependentVars(
        getFieldValue: (field: string) => any,
        name: string,
        value: any,
        reference?: any
    ): string {
        return '';
    }
}
