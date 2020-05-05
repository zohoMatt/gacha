import { Rule } from '../../utils/validator';
import { BaseValidator, BasicInfoRules, RulesDictionary } from './base.validator';

const IntOver0Rules: Rule[] = [
    { type: 'required' },
    { type: 'number', limit: 'min', values: [{ value: 0, include: false }] }
];

export class PsdmValidator extends BaseValidator {
    public readonly BASIC_RULES: RulesDictionary = {
        ...BasicInfoRules,
        totalRunTime: {
            label: 'Total Run Time',
            rules: IntOver0Rules
        },
        firstPointDisplayed: {
            label: 'First Point Displayed',
            rules: IntOver0Rules
        },
        timeStep: {
            label: 'Time Step',
            rules: IntOver0Rules
        },
        numOfAxialElms: {
            label: 'Number of Axial Elements',
            rules: IntOver0Rules
        },
        axialCollocatPts: {
            label: 'Axial Direction',
            rules: IntOver0Rules
        },
        radialCollocatPts: {
            label: 'Radical Direction',
            rules: IntOver0Rules
        }
    };

    public readonly DEPENDENT_RULES_RELATED_KEYS: string[] = [
        'totalRunTime',
        'firstPointDisplayed',
        'timeStep'
    ];

    protected checkDependentVars(
        getFieldValue: (field: string) => any,
        name: string,
        value: any,
        reference: number
    ): string {
        const totalRunTime = getFieldValue('totalRunTime');
        const firstPointDisplayed = getFieldValue('firstPointDisplayed');
        const timeStep = getFieldValue('timeStep');

        if (name !== 'timeStep' && totalRunTime <= firstPointDisplayed) {
            return `'Total Run Time' must be greater than 'First Point Displayed'.`;
        }
        if (name !== 'firstPointDisplayed' && totalRunTime / timeStep > reference) {
            return `(Total Run Time)/(Time Step) must be no more than ${reference}.`;
        }
        return '';
    }
}
