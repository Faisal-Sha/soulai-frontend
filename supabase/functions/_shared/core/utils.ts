/**
 * Sum all digits of a number
 */
export const sumDigits = (n: number): number =>
    String(Math.trunc(Math.abs(n)))
        .split("")
        .reduce((s, d) => s + Number(d), 0);

/**
 * Reduce to 1..22 with special handling for master numbers 11 and 22
 */
export const reduceTo22 = (n: number): number => {
    if (n === 11 || n === 22) return n;
    while (n > 22) {
        n = n.toString().split('').reduce((sum, digit) => sum + Number(digit), 0);
    }
    return n === 0 ? 22 : n;
};

/**
 * Final reduction to 1..9 (digital root)
 */
export const reduce9 = (n: number): number => {
    let x = Math.trunc(Math.abs(n));
    while (x > 9) x = sumDigits(x);
    if (x === 0) x = 9;
    return x;
};

export const reduceTo22Strict = (n: number): number => {
    let x = Math.trunc(Math.abs(n));
    while (x > 22) x = sumDigits(x);
    if (x === 0) x = 22;
    return x;
};
