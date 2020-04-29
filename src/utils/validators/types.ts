export interface ValidatorOutput {
    valid: ValidLevels;
    message: string;
}
export interface Validator {
    [key: string]: (...args: any[]) => ValidatorOutput;
}

export enum ValidLevels {
    Valid = 0,
    Info = 1,
    Warn = 2,
    Error = 3
}
