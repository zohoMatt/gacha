export interface Response {
    key: number;
    data: any;
}

export interface IpcListenerRegistration {
    channel: string;
    listener: (event: any, arg: any) => Response;
    once?: boolean;
}

export interface IpcSubModule {
    prefix: string;
    listeners: IpcListenerRegistration[];
}
