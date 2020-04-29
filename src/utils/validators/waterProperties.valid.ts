import { Validator, ValidLevels } from './types';

const valid = {
    valid: ValidLevels.Valid,
    message: ''
};

const WaterPopertiesValidators: Validator = {
    name: (name: string, allNames?: string[]) => {
        console.log(name, allNames);
        if (name.length <= 0 || name.length > 20) {
            return {
                valid: ValidLevels.Error,
                message: 'Length of Name should be between 1 - 20'
            };
        } if (allNames && allNames.includes(name)) {
            return {
                valid: ValidLevels.Error,
                message: 'Name already exits. Please change to a different value.'
            };
        } 
            return valid;
        
    },
    description: (descr: string) => {
        if (descr.length > 80) {
            return {
                valid: ValidLevels.Error,
                message: 'Description is too long.'
            };
        } 
            return valid;
        
    },
    pressure: (pressure: number) => {
        if (pressure < 0.9 || pressure > 1.1) {
            return {
                valid: ValidLevels.Warn,
                message: 'Abnormal pressure value.'
            };
        } 
            return valid;
        
    },
    temperature: (temperature: number) => {
        if (temperature <= 0 || temperature >= 100) {
            return {
                valid: ValidLevels.Error,
                message: 'Abnormal temperature value.'
            };
        } 
            return valid;
        
    }
};

export { WaterPopertiesValidators };
