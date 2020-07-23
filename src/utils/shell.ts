export const escapeShell = (cmd: string) => {
    return cmd.replace(/(["\s'$`\\])/g, '\\$1');
};
