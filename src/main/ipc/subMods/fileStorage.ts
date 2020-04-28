import { IpcSubModule } from '../types';

const fileStorage: IpcSubModule = {
    prefix: 'fs',
    listeners: [
        {
            channel: 'save-water',
            listener: (event: any, arg: any) => {
                console.log(`save-water received data ${JSON.stringify(arg)}`);
                return {
                    key: 200,
                    data: { result: 'saved, relax' }
                };
            },
            once: false
        }
    ]
};

export { fileStorage };
