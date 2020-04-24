export function difference<T>(origin: T[], toRemove: T[]) {
    return origin.filter(e => toRemove.indexOf(e) < 0);
}
