import { BriefRecordType, FullRecordType } from '../../renderer/store/types';

export interface ValidatorOutput {
    valid: ValidLevels;
    message: string;
}
export interface Validator<T> {
    [key: string]: (
        recordToSave: BriefRecordType<T>,
        keyToSave: string,
        recordList: FullRecordType<T>[]
    ) => ValidatorOutput;
}

export enum ValidLevels {
    Valid = 0,
    Info = 1,
    Warn = 2,
    Error = 3
}
