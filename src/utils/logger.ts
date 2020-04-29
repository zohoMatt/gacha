import { configure, getLogger } from 'log4js';

const config = require('../../log/log4jsrc.json');

export class Logger {
    public static log: any = null;

    public static init(filePath?: string) {
        configure(config);
        Logger.log = getLogger(process.env.NODE_ENV === 'production' ? 'user' : 'dev');
    }
}
