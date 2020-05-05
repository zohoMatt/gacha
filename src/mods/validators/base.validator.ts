import { Validator, Rule } from '../../utils/validator';
import { BriefRecordType } from '../../renderer/store/types';

export interface RulesDictionary {
    [key: string]: {
        label: string;
        rules: Rule[];
    };
}

type RuleRenderer = any;
type FormInstance = any;

export const BasicInfoRules: RulesDictionary = {
    name: {
        label: 'Name',
        rules: [
            { type: 'required' },
            { type: 'string', limit: 'max', values: [{ value: 20, include: true }] }
        ]
    },
    description: {
        label: 'Description',
        rules: [
            { type: 'required' },
            { type: 'string', limit: 'max', values: [{ value: 80, include: true }] }
        ]
    },
    manufacturer: {
        label: 'Manufacturer',
        rules: [
            { type: 'required' },
            { type: 'string', limit: 'max', values: [{ value: 20, include: true }] }
        ]
    }
};

export abstract class BaseValidator {
    public abstract readonly BASIC_RULES: RulesDictionary;

    public abstract readonly DEPENDENT_RULES_RELATED_KEYS: string[];

    protected abstract checkDependentVars(
        getFieldValue: (field: string) => any,
        name: string,
        value: any,
        reference?: any
    ): string;

    public genBasicValidator(name: string) {
        return {
            validator: (r: any, value: any) => {
                const { rules, label } = this.BASIC_RULES[name];
                const msg = Validator.validateForFirstMsg(rules, value, label);
                return msg === '' ? Promise.resolve() : Promise.reject(msg);
            }
        };
    }

    public genDependentValidator(name: string, reference?: any) {
        if (this.DEPENDENT_RULES_RELATED_KEYS.includes(name)) {
            return ({ getFieldValue }: FormInstance) => ({
                validator: (r: any, value: any) => {
                    const msg = this.checkDependentVars(getFieldValue, name, value, reference);
                    return msg === '' ? Promise.resolve() : Promise.reject(msg);
                }
            });
        }
        return { validator: () => Promise.resolve() };
    }

    public getFormValidators(name: string, reference?: any) {
        return [this.genBasicValidator(name), this.genDependentValidator(name, reference)];
    }
}
