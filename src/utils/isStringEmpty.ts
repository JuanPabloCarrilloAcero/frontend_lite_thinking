export function isStringEmpty(input: string): boolean {

    if (input === undefined || input === null) {
        return true;
    }

    return input.trim() === '';
}