import axios from 'axios';
import * as fs from 'fs-extra';
import * as path from 'path';
import { promisify } from 'util';
import { app } from 'electron';
import { exec } from 'child_process';
import { escapeShell } from '../../utils/shell';

const config = require('../../../assets/exec/executable.config.json');

export enum VersionType {
    Latest,
    Stable
}

const downloadFile = async (url: string, to: string) => {
    const response = await axios.get(url, { responseType: 'stream' });
    try {
        await response.data.pipe(fs.createWriteStream(to));
    } catch (e) {
        console.log(e);
    }
};

const execute = async (binPath: string) => {
    const escaped = escapeShell(binPath);
    await promisify(exec)(`chmod 755 ${escaped}`);
    await promisify(exec)(`${escaped}`);
};

export async function startServer(type: VersionType = VersionType.Stable) {
    const binConfig = type === VersionType.Latest ? config.latest : config.stable;
    const dirPath = path.join(app.getPath('userData'), 'bin');
    const filePath = path.join(dirPath, `psdm-server-v${binConfig.version}`);
    if (!fs.existsSync(filePath)) {
        fs.emptyDirSync(dirPath);
        fs.ensureFileSync(filePath);
        await downloadFile(binConfig.url, filePath);
    }
    return execute(filePath);
}
