import { Validator, ValidatorOutput, ValidLevels } from './types';
import { CommonValidator, Output } from './common';
import { PsdmParams } from '../../renderer/store/psdm.store';
import { BriefRecordType } from '../../renderer/store/types';

const threeFactorValidator = (
    record: BriefRecordType<PsdmParams>,
    pointsLimit = 500
): ValidatorOutput => {
    const { totalRunTime, firstPointDisplayed, timeStep } = record;
    const threeFactors: any = { totalRunTime, firstPointDisplayed, timeStep };
    // Above 0
    for (const key in threeFactors) {
        if (!threeFactors.hasOwnProperty(key)) continue;
        if (threeFactors[key] <= 0) {
            return {
                valid: ValidLevels.Error,
                message: `{${key}} must be above 0.`
            };
        }
    }

    // Relations
    if (totalRunTime <= firstPointDisplayed) {
        return {
            valid: ValidLevels.Error,
            message: '{Total Run Time} must be greater than {First Point Displayed}.'
        };
    } if (totalRunTime / timeStep < pointsLimit) {
        return {
            valid: ValidLevels.Error,
            message: `{Total Run Time}/{Time Step} must be less than ${pointsLimit}.`
        };
    } return {
            valid: ValidLevels.Valid,
            message: ''
        };
};

export const PsdmSimParamsValidators: Validator<PsdmParams> = {
    ...CommonValidator.nameDescrptValidator,
    totalRunTime: r => threeFactorValidator(r),
    firstPointDisplayed: r => threeFactorValidator(r),
    timeStep: r => threeFactorValidator(r)
};
