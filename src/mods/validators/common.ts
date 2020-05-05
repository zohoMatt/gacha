import { message } from 'antd';
import { Validator, ValidatorOutput, ValidLevels } from './types';
import { BriefRecordType, FullRecordType } from '../../renderer/store/types';

export namespace Output {
    export const VALID = {
        valid: ValidLevels.Valid,
        message: ''
    };
}

export namespace Automation {
    export function triggerValidator(validResult: ValidatorOutput, minLevel: ValidLevels) {
        if (validResult.valid >= minLevel) {
            message.error(validResult.message);
            return false;
        }
        return true;
    }

    export function formValidator<T>(
        validator: Validator<T>,
        record: BriefRecordType<T>,
        key: string,
        list: FullRecordType<T>[],
        minLevel: ValidLevels
    ): boolean {
        for (const prop in validator) {
            if (!triggerValidator(validator[prop](record, key, list), minLevel)) return false;
        }
        return true;
    }
}

export namespace CommonValidator {
    export const nameDescrptValidator = {
        name: (record: BriefRecordType<any>, key: string, list: FullRecordType<any>[]) => {
            const { name } = record;
            console.log('validdate', name);
            if (name.length <= 0 || name.length > 20) {
                return {
                    valid: ValidLevels.Error,
                    message: 'Length of Name should be between 1 - 20'
                };
            }
            const allNames = list.map(r => (r.key === key ? '' : r.name));
            if (allNames.includes(name)) {
                return {
                    valid: ValidLevels.Error,
                    message: 'Name already exits. Please change to a different value.'
                };
            }
            return Output.VALID;
        },
        description: (record: BriefRecordType<any>) => {
            const { description } = record;
            if (description.length > 80) {
                return {
                    valid: ValidLevels.Error,
                    message: 'Description is too long.'
                };
            }
            return Output.VALID;
        }
    };
}

export namespace Rule {
    /* eslint-disable no-template-curly-in-string */
    const typeTemplate = "'${label}' is not a valid ${type}";
    export const FORM_WARNING_PROMPT = {
        default: "Validation error on field '${label}'",
        required: "'${label}' is required",
        enum: "'${label}' must be one of [${enum}]",
        whitespace: "'${label}' cannot be empty",
        date: {
            format: "'${label}' is invalid for format date",
            parse: "'${label}' could not be parsed as date",
            invalid: "'${label}' is invalid date"
        },
        types: {
            string: typeTemplate,
            method: typeTemplate,
            array: typeTemplate,
            object: typeTemplate,
            number: typeTemplate,
            date: typeTemplate,
            boolean: typeTemplate,
            integer: typeTemplate,
            float: typeTemplate,
            regexp: typeTemplate,
            email: typeTemplate,
            url: typeTemplate,
            hex: typeTemplate
        },
        string: {
            len: "'${label}' must be exactly ${len} characters",
            min: "'${label}' must be at least ${min} characters",
            max: "'${label}' cannot be longer than ${max} characters",
            range: "'${label}' must be between ${min} and ${max} characters"
        },
        number: {
            len: "'${label}' must equal ${len}",
            min: "'${label}' cannot be less than ${min}",
            max: "'${label}' cannot be greater than ${max}",
            range: "'${label}' must be between ${min} and ${max}"
        },
        array: {
            len: "'${label}' must be exactly ${len} in length",
            min: "'${label}' cannot be less than ${min} in length",
            max: "'${label}' cannot be greater than ${max} in length",
            range: "'${label}' must be between ${min} and ${max} in length"
        },
        pattern: {
            mismatch: "'${label}' does not match pattern ${pattern}"
        }
    };
    /* eslint-enable no-template-curly-in-string */

    export const interploTag = (strings: string[], ...args: any[]) => {
        return strings.reduce((res, c, i) => res + c + (i === args.length ? '' : args[i]), '');
    };

    // todo Refactor
    export const TEMPLATE = {
        number: {
            max: (label: string, num1: number) => `${label} must be below ${num1}.`,
            min: (label: string, num1: number) => `${label} must be above ${num1}.`,
            range: (label: string, num1: number, num2: number) =>
                `${label} must be between ${num1} and ${num2}.`
        },
        string: {
            max: (label: string, num1: number) =>
                `${label} must have less than ${num1} characters.`,
            min: (label: string, num1: number) =>
                `${label} must have greater than ${num1} characters.`,
            range: (label: string, num1: number, num2: number) =>
                `${label} must have ${num1} to ${num2} characters.`,
            exactly: (label: string, num1: number) =>
                `${label} must have exactly ${num1} characters.`
        }
    };

    export function numMaxRule(target: number, max: number, label: string, includes = false) {
        if (target < max || (includes && target === max)) {
            return Output.VALID;
        }
        return {
            valid: ValidLevels.Error,
            message: TEMPLATE.number.max(label, max)
        };
    }

    export function numMinRule(target: number, min: number, label: string, includes = false) {
        if (target > min || (includes && target === min)) {
            return Output.VALID;
        }
        return {
            valid: ValidLevels.Error,
            message: TEMPLATE.number.min(label, min)
        };
    }

    export function numRangeRule(
        target: number,
        label: string,
        min: number,
        max: number,
        includes: 'both' | 'left' | 'right' | null
    ) {
        const leftYes =
            numMinRule(target, min, label, includes === 'both' || includes === 'left').valid ===
            ValidLevels.Valid;
        const rightYes =
            numMaxRule(target, max, label, includes === 'both' || includes === 'right').valid ===
            ValidLevels.Valid;
        if (leftYes && rightYes) {
            return Output.VALID;
        }
        return TEMPLATE.number.range(label, min, max);
    }

    export function stringMaxRule(target: string, max: number, label: string, includes: boolean) {
        const yes = numMaxRule(target.length, max, label, includes).valid === ValidLevels.Valid;
        if (yes) return Output.VALID;
        return TEMPLATE.string.max(label, max);
    }
}
