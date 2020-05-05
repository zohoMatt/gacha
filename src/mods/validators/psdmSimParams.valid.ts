import { Validator, ValidatorOutput, ValidLevels } from './types';
import { CommonValidator, Rule } from './common';
import { PsdmParams } from '../../renderer/store/psdm.store';
import { BriefRecordType } from '../../renderer/store/types';

const threeFactorValidator = (
    record: BriefRecordType<PsdmParams>,
    pointsLimit = 500
): ValidatorOutput => {
    const { totalRunTime, firstPointDisplayed, timeStep } = record;
    const NAMES: any = {
        totalRunTime: 'Total Run Time',
        firstPointDisplayed: 'First Point Displayed',
        timeStep: 'Time Step'
    };
    const threeFactors: any = { totalRunTime, firstPointDisplayed, timeStep };
    // Above 0
    for (const key in threeFactors) {
        if (!threeFactors.hasOwnProperty(key)) continue;
        if (threeFactors[key] <= 0) {
            return Rule.numMinRule(threeFactors[key], 0, NAMES[key]);
        }
    }

    // Relations
    if (totalRunTime <= firstPointDisplayed) {
        return {
            valid: ValidLevels.Error,
            message: `Total Run Time' must be greater than 'First Point Displayed'.`
        };
    }
    if (totalRunTime / timeStep > pointsLimit) {
        return {
            valid: ValidLevels.Error,
            message: `(Total Run Time)/(Time Step) must be no more than ${pointsLimit}.`
        };
    }
    return {
        valid: ValidLevels.Valid,
        message: ''
    };
};

export const PsdmSimParamsValidators: Validator<PsdmParams> = {
    ...CommonValidator.nameDescrptValidator,
    totalRunTime: r => threeFactorValidator(r),
    firstPointDisplayed: r => threeFactorValidator(r),
    timeStep: r => threeFactorValidator(r),
    numOfAxialElms: r => Rule.numMinRule(r.numOfAxialElms, 0, 'Number of Axial Elements'),
    axialCollocatPts: r => Rule.numMinRule(r.axialCollocatPts, 0, 'Axial Direction'),
    radialCollocatPts: r => Rule.numMinRule(r.radialCollocatPts, 0, 'Radical Direction')
};
