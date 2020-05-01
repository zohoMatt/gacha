import { Validator, ValidLevels } from './types';
import { CommonValidator, Output } from './common';
import { WaterParams } from '../../renderer/store/water.store';
import { BriefRecordType } from '../../renderer/store/types';

const WaterPropertiesValidators: Validator<WaterParams> = {
    ...CommonValidator.nameDescrptValidator,
    pressure: (record: BriefRecordType<WaterParams>) => {
        const { pressure } = record;
        if (pressure < 0.9 || pressure > 1.1) {
            return {
                valid: ValidLevels.Warn,
                message: 'Abnormal pressure value.'
            };
        }
        return Output.VALID;
    },
    temperature: (record: BriefRecordType<WaterParams>) => {
        const { temperature } = record;
        if (temperature <= 0 || temperature >= 100) {
            return {
                valid: ValidLevels.Error,
                message: 'Abnormal temperature value.'
            };
        }
        return Output.VALID;
    }
};

export { WaterPropertiesValidators };
