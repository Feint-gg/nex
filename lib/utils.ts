// Make only first letter uppercase
export function upperFirstLetter(str: string): string {
    str = str.toLocaleLowerCase()

    return str.charAt(0).toUpperCase() + str.slice(1);
}