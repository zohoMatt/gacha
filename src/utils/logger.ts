import { configure, getLogger } from 'log4js';
import { AppEnv } from '../mods/env';

const config = require('../../log/log4jsrc.json');

export class Logger {
    public static log: any = null;

    public static init(filePath?: string) {
        configure(config);
        Logger.log = getLogger(process.env.APP_ENV === AppEnv.Production ? 'user' : 'dev');
    }
}
