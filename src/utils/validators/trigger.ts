import { message } from 'antd';
import { ValidLevels, ValidatorOutput } from './types';

export function triggerValidator(validResult: ValidatorOutput, minLevel: ValidLevels) {
    if (validResult.valid >= minLevel) {
        message.error(validResult.message);
        return false;
    } return true;
}
