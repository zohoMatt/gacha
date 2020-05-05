import * as mustache from 'mustache';

/* eslint-disable no-template-curly-in-string */
const typeTemplate = "'${label}' is not a valid ${type}";
export const VALIDATE_MSG_TEMPLATE = {
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

export enum ValidLevels {
    Valid = 0,
    Info = 1,
    Warn = 2,
    Error = 3
}

export interface ValidatorOutput {
    valid: ValidLevels;
    message: string;
}

export interface MsgTemplateParams {
    label: string;
    min?: number;
    max?: number;
}

// todo Support more rules
export interface Rule {
    type: 'string' | 'number' | 'required';
    limit?: 'len' | 'min' | 'max' | 'range';
    values?: { value: number; include?: boolean }[];
}

export class Validator {
    public static readonly messageTemplate = VALIDATE_MSG_TEMPLATE;

    protected static render(template: string, params: MsgTemplateParams) {
        mustache.tags = ['${', '}'];

        return mustache.render(template, params);
    }

    protected static rangeCheck(
        target: number,
        min: number,
        minIncluded: boolean,
        max: number,
        maxIncluded: boolean
    ) {
        return (
            (target > min || (target === min && minIncluded)) &&
            (target < max || (target === max && maxIncluded))
        );
    }

    protected static validateOne(
        rule: Rule,
        target: string | number,
        label: string
    ): ValidatorOutput {
        console.log('validateOne', rule, target, label);
        const valid = {
            valid: ValidLevels.Valid,
            message: ''
        };
        const invalid = (template: string, min?: number, max?: number) => ({
            valid: ValidLevels.Error,
            message: Validator.render(template, { label, min, max })
        });

        if (rule.type === 'required') {
            return target || target === 0 ? valid : invalid(Validator.messageTemplate.required);
        }
        if (rule.limit === 'len') {
            // rule.type === 'number' | 'string'
            if (!rule.values || rule.values.length < 1)
                throw new Error(`Invalid params when checking ${target} with ${label}.`);
            const limit = rule.values[0];
            const checked =
                typeof target === 'string' ? target.length === limit.value : target === limit.value;
            return checked ? valid : invalid(Validator.messageTemplate[rule.type].len);
        }
        if (!rule.values || rule.values.length < 1)
            throw new Error(`Invalid params when checking ${target} with ${label}.`);
        const { value: limit1, include: limit1Included } = rule.values[0];
        const { value: limit2, include: limit2Included } = rule.values[1] || {
            value: Infinity,
            include: false
        };
        const trueTarget = typeof target === 'string' ? target.length : target;
        let min = 0;
        let max = 0;
        let isChecked = false;
        if (rule.limit === 'max') {
            max = limit1;
            isChecked = Validator.rangeCheck(trueTarget, -Infinity, false, max, !!limit1Included);
        } else {
            min = limit1;
            max = limit2;
            isChecked = Validator.rangeCheck(
                trueTarget,
                limit1,
                !!limit1Included,
                limit2,
                !!limit2Included
            );
        }
        return isChecked
            ? valid
            : invalid(Validator.messageTemplate[rule.type][rule.limit!], min, max);
    }

    public static validate(rules: Rule[], target: number | string, label: string) {
        return rules.every(
            rule => Validator.validateOne(rule, target, label).valid === ValidLevels.Valid
        );
    }

    public static validateForFirstMsg(
        rules: Rule[],
        target: number | string,
        label: string
    ): string {
        for (const rule of rules) {
            const isValid = Validator.validateOne(rule, target, label);
            if (isValid.valid !== ValidLevels.Valid) {
                return isValid.message;
            }
        }
        return '';
    }
}
