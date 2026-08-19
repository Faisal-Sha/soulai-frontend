/**
 * Sum all digits of a number
 * Example: sumDigits(17) = 1+7 = 8
 */
export const sumDigits = (n: number): number =>
    String(Math.trunc(Math.abs(n)))
        .split("")
        .reduce((s, d) => s + Number(d), 0);

/**
 * Reduce to 1..22 - only reduces if > 22
 * Numbers 10..22 (including master numbers 11 and 22) are kept as is
 * Example: reduceTo22Strict(39) = 3+9 = 12 (kept)
 * Example: reduceTo22Strict(25) = 2+5 = 7
 */
export const reduceTo22Strict = (n: number): number => {
    let x = Math.trunc(Math.abs(n));
    while (x > 22) x = sumDigits(x);
    if (x === 0) x = 22;
    return x;
};

/**
 * Final reduction to 1..9 (digital root)
 * Example: reduce9(16) = 1+6 = 7
 * Example: reduce9(22) = 2+2 = 4
 */
export const reduce9 = (n: number): number => {
    let x = Math.trunc(Math.abs(n));
    while (x > 9) x = sumDigits(x);
    if (x === 0) x = 9;
    return x;
};

/**
 * Reduce to 1..22 with special handling for master numbers 11 and 22
 * Keeps 11 and 22 as is, reduces values > 22 by summing digits
 * Example: reduceTo22(11) = 11 (master number kept)
 * Example: reduceTo22(22) = 22 (master number kept)
 * Example: reduceTo22(25) = 2+5 = 7
 * Example: reduceTo22(39) = 3+9 = 12
 */
export const reduceTo22 = (n: number): number => {
    if (n === 11 || n === 22) return n;
    while (n > 22) {
        n = n.toString().split('').reduce((sum, digit) => sum + Number(digit), 0);
    }
    return n === 0 ? 22 : n;
};

/**
 * Calculate age energies using recursive midpoint summation (Anchor A + Anchor B = Mid)
 * Matches the logic from avatariumlife.com
 * @param anchors - 8 primary anchor energies (0, 10, 20, 30, 40, 50, 60, 70)
 * @returns Array of 64 energy points for the full 80-year cycle
 */
export const calculateAgeEnergies = (anchors: number[]): number[] => {
    if (anchors.length !== 8) return new Array(64).fill(0);

    const fullCycle: number[] = [];

    // Each span is 10 years (e.g., 0 to 10)
    for (let i = 0; i < 8; i++) {
        const A = anchors[i];
        const B = anchors[(i + 1) % 8];

        // Midpoints (Recursive)
        const mid50 = reduceTo22(A + B);
        const mid25 = reduceTo22(A + mid50);
        const mid75 = reduceTo22(mid50 + B);

        // Tiny points
        const mid12 = reduceTo22(A + mid25);
        const mid37 = reduceTo22(mid25 + mid50);
        const mid62 = reduceTo22(mid50 + mid75);
        const mid87 = reduceTo22(mid75 + B);

        // Sequence for this 10-year span (8 points total)
        // 0, 1.25, 2.5, 3.75, 5.0, 6.25, 7.5, 8.75
        fullCycle.push(A, mid12, mid25, mid37, mid50, mid62, mid75, mid87);
    }

    return fullCycle;
};

/**
 * Generate energy timeline for yearly cycles (Linear +1 version)
 * Used for energies of the year, not the main age ring.
 */
export const getEnergyTimeline = (baseEnergy: number, periods: number = 65): number[] => {
    const energies = [baseEnergy];
    for (let i = 1; i < periods; i++) {
        const next = reduceTo22(energies[i - 1] + 1);
        energies.push(next);
    }
    return energies;
};

/**
 * Formats age label for the year energy table (e.g. 1.25 -> 1.3)
 */
export const formatAgeLabel = (val: number): string => {
    if (val % 1 === 0) return val.toString();
    let text = '';
    if (Math.abs((val % 1) - 0.25) < 0.01) text = (Math.floor(val) + 0.3).toFixed(1);
    else if (Math.abs((val % 1) - 0.5) < 0.01) text = (Math.floor(val) + 0.5).toFixed(1);
    else if (Math.abs((val % 1) - 0.75) < 0.01) text = (Math.floor(val) + 0.7).toFixed(1);
    else text = val.toFixed(1);
    return text.replace('.', ',');
};

export interface YearEnergyRow {
    ageRange: string;
    energy1: number;
    energy2: number;
    energy3: number;
}

/**
 * Calculates the full table of year energies (Main, Problem, Reward)
 * Matches avatariumlife.com logic by using personal and social circles.
 */
export const calculateYearEnergiesTable = (matrix: any): YearEnergyRow[] => {
    // Personal circle anchors (every 10 years: 0, 10, 20, 30, 40, 50, 60, 70)
    const pAnchors = [matrix.a, matrix.f, matrix.b, matrix.g, matrix.c, matrix.y, matrix.d, matrix.k];

    // Social circle anchors (opposites of personal: 40, 50, 60, 70, 0, 10, 20, 30)
    const sAnchors = [matrix.c, matrix.y, matrix.d, matrix.k, matrix.a, matrix.f, matrix.b, matrix.g];

    const col1 = calculateAgeEnergies(pAnchors);
    const col2 = calculateAgeEnergies(sAnchors);

    const rows: YearEnergyRow[] = [];
    const totalTicks = 64; // 80 years / 1.25 years per tick

    for (let i = 0; i < totalTicks; i++) {
        const age = i * 1.25;
        const nextAge = (i + 1) * 1.25;

        const label = `${formatAgeLabel(age)}-${formatAgeLabel(nextAge)}`;
        const e1 = col1[i];
        const e2 = col2[i];
        const e3 = reduceTo22(e1 + e2);

        rows.push({
            ageRange: label,
            energy1: e1,
            energy2: e2,
            energy3: e3
        });
    }

    return rows;
};
