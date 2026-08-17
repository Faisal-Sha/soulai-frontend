import { MatrixValues } from "./calc";
import { reduceTo22 } from "./utils";

export interface YearEnergies {
    age: number;
    yearEnergy: number;
    transitionEnergy: number;
    shadowEnergy: number;
}

/**
 * Calculates the energy for a specific age based on the 8-vertex recursive logic.
 * The circle (0-80 years) is divided into 8 sectors of 10 years each.
 * 0: A (Day)
 * 10: F (A+B)
 * 20: B (Month)
 * 30: G (B+C)
 * 40: C (Year)
 * 50: Y (C+D)
 * 60: D (Bottom)
 * 70: K (D+A)
 * 80: A (Day)
 */
export const calculateEnergyForAge = (matrix: MatrixValues, age: number): number => {
    // Normalize age to 0-80 range (cycle)
    const normalizedAge = age % 80;

    // Define main vertices (10-year steps)
    // We use a map of Age -> Energy Value
    const vertices: Record<number, number> = {
        0: matrix.a,
        10: reduceTo22(matrix.a + matrix.b),
        20: matrix.b,
        30: reduceTo22(matrix.b + matrix.c),
        40: matrix.c,
        50: reduceTo22(matrix.c + matrix.d),
        60: matrix.d,
        70: reduceTo22(matrix.d + matrix.a),
        80: matrix.a,
    };

    // If age is exactly a 10-year vertex, return it
    if (vertices[normalizedAge] !== undefined) {
        return vertices[normalizedAge];
    }

    // Recursive search for the arcana
    // We look for the smallest interval [start, end] containing the age
    return findEnergyRecursively(normalizedAge, 0, 80, vertices[0], vertices[80]);
};

// Recursive helper to find energy for intermediate ages
// standard logic: mid = (start + end) / 2 -> Energy = reduce(E_start + E_end)
const findEnergyRecursively = (
    targetAge: number,
    startAge: number,
    endAge: number,
    energyStart: number,
    energyEnd: number
): number => {
    // If the target matches an endpoint (should be caught earlier, but for safety)
    if (Math.abs(targetAge - startAge) < 0.01) return energyStart;
    if (Math.abs(targetAge - endAge) < 0.01) return energyEnd;

    // Calculate midpoint
    const midAge = (startAge + endAge) / 2;
    const midEnergy = reduceTo22(energyStart + energyEnd);

    // If target is the midpoint
    if (Math.abs(targetAge - midAge) < 0.01) {
        return midEnergy;
    }

    // If calculating for standard integer years (1, 2, 3...), we might need to go deeper
    // Standard prognosis usually goes down to 1.25 year intervals or smaller.
    // We'll recurse until the interval is small enough (e.g., <= 1 year or <= 0.1)
    // or until we hit the exact target match in a standard step.

    // However, for optimization, let's limit recursion depth or interval size.
    // The standard steps are: 10 -> 5 -> 2.5 -> 1.25.
    // 1.25 years is often the smallest "major" unit.
    // But users often want "Age 26".
    // 26 is between 25 and 27.5?
    // Let's recurse until interval <= 1.25 roughly, and then interpolate? 
    // Actually, Matrix of Destiny usually ASSIGNS the closest period's energy or sums further.
    // Let's stick to strict midpoints down to a reasonable precision.

    if (targetAge < midAge) {
        return findEnergyRecursively(targetAge, startAge, midAge, energyStart, midEnergy);
    } else {
        return findEnergyRecursively(targetAge, midAge, endAge, midEnergy, energyEnd);
    }
};

/**
 * Wrapper to get exact yearly energies for a range.
 * Note: Matrix years usually span from Birthday to Birthday.
 * 
 * We will generate a list for ages 0 to 80 with 1-year steps?
 * Or 1.25 steps? The reference had 1.25 steps.
 * "0-1.3", "1.3-2.5" -> 1.25 is 80/64.
 */

export const getEnergiesForPeriod = (matrix: MatrixValues, step: number = 1): YearEnergies[] => {
    const result: YearEnergies[] = [];

    // Generate energies for integers 0 to 80
    for (let age = 0; age <= 80; age += step) {
        // 1. Year Energy (Energy 1)
        const yearEnergy = calculateRecursiveEnergy(age, matrix);

        // 2. Transition Energy (Energy 2) - Opposite point (Age + 40)
        // The opposite of age x on the 80-year circle is (x + 40) % 80
        const transitionAge = (age + 40) % 80;
        const transitionEnergy = calculateRecursiveEnergy(transitionAge, matrix);

        // 3. Shadow Energy (Energy 3) - Sum of 1 and 2
        const shadowEnergy = reduceTo22(yearEnergy + transitionEnergy);

        result.push({
            age,
            yearEnergy,
            transitionEnergy,
            shadowEnergy
        });
    }
    return result;
};

// Iterative implementation to ensure we hit the standard "matrix points"
// The standard points are:
// Level 0: 0, 10, 20, 30, 40, 50, 60, 70
// Level 1: 5, 15, 25... (+5)
// Level 2: 2.5, 7.5... (+2.5) -> 2 Years 6 Months
// Level 3: 1.25... (+1.25) -> 1 Year 3 Months
// For integer ages, we find the closest defined period or standard reduction.
// Common practice: Age 26.
// 20-30 -> Mid 25.
// 25-30 -> Mid 27.5.
// 25-27.5 -> Mid 26.25.
// 25-26.25 -> Mid 25.625...
// Usually we simply accept the "Influence" of the period.
// For this module, let's implement the specific logic to calculate exact 'points' and map years to them.

const calculateRecursiveEnergy = (age: number, matrix: MatrixValues): number => {
    // Vertices (Level 0)
    const v0 = matrix.a;  // 0
    const v10 = reduceTo22(matrix.a + matrix.b);
    const v20 = matrix.b; // 20
    const v30 = reduceTo22(matrix.b + matrix.c);
    const v40 = matrix.c; // 40
    const v50 = reduceTo22(matrix.c + matrix.d);
    const v60 = matrix.d; // 60
    const v70 = reduceTo22(matrix.d + matrix.a);
    const v80 = matrix.a; // 80

    const getSector = (a: number) => {
        if (a < 10) return [0, 10, v0, v10];
        if (a < 20) return [10, 20, v10, v20];
        if (a < 30) return [20, 30, v20, v30];
        if (a < 40) return [30, 40, v30, v40];
        if (a < 50) return [40, 50, v40, v50];
        if (a < 60) return [50, 60, v50, v60];
        if (a < 70) return [60, 70, v60, v70];
        return [70, 80, v70, v80];
    };

    // Level 1 (5 year steps)
    const [s, e, vs, ve] = getSector(age);
    if (age === s) return vs;
    if (age === e) return ve;

    const mid = s + 5;
    const vMid = reduceTo22(vs + ve);

    if (Math.abs(age - mid) < 0.01) return vMid;

    // Level 2 (2.5 year steps)
    const [s2, e2, vs2, ve2] = age < mid
        ? [s, mid, vs, vMid]
        : [mid, e, vMid, ve];

    const mid2 = s2 + 2.5;
    const vMid2 = reduceTo22(vs2 + ve2);

    if (Math.abs(age - mid2) < 0.01) return vMid2;

    // Level 3 (1.25 year steps)
    const [s3, e3, vs3, ve3] = age < mid2
        ? [s2, mid2, vs2, vMid2]
        : [mid2, e2, vMid2, ve2];

    const mid3 = s3 + 1.25;
    const vMid3 = reduceTo22(vs3 + ve3);

    // If age falls within a range, we typically assign the energy of the START of that range
    // or the "Main Energy" of that period.
    // The reference table uses ranges: 0-1.3 (0 to 1.25), 1.3-2.5 (1.25 to 2.5)
    // So for Age X, we check which interval it belongs to.

    // For exact calculation purposes, let's treat the age as seeking the specific point's energy
    // But since integer years don't align with 1.25 steps perfectly, we map:
    // Age 1 -> falls in 0-1.25 -> Energy of 0? Or interpolation?
    // Usually it's "Energy of the Year" = The energy governing the current period.
    // So if I am 1 year old, I am in the 0-1.25 sector.

    // For the UI table, we will list the INTERVALS, not just integers.
    // So we don't need to interpolate for "Age 1". We generate the list of intervals.

    return 0; // Not used for the table generation approach
};

export interface EnergyPeriod {
    startAge: number;
    endAge: number;
    label: string; // "0 - 1.25" or "0 - 1 year 3 mo"
    yearEnergy: number; // Energy 1
    transitionEnergy: number; // Energy 2
    shadowEnergy: number; // Energy 3
}

export const generateEnergyPeriods = (matrix: MatrixValues): EnergyPeriod[] => {
    const periods: EnergyPeriod[] = [];
    const step = 1.25; // 80 / 64

    // Pre-calculate vertices for fast lookup
    const v0 = matrix.a;
    const v10 = reduceTo22(matrix.a + matrix.b);
    const v20 = matrix.b;
    const v30 = reduceTo22(matrix.b + matrix.c);
    const v40 = matrix.c;
    const v50 = reduceTo22(matrix.c + matrix.d);
    const v60 = matrix.d;
    const v70 = reduceTo22(matrix.d + matrix.a);
    const v80 = matrix.a;

    const getVal = (age: number): number => {
        // Handle exact major vertices
        if (Math.abs(age - 0) < 0.01 || Math.abs(age - 80) < 0.01) return v0;
        if (Math.abs(age - 10) < 0.01) return v10;
        if (Math.abs(age - 20) < 0.01) return v20;
        if (Math.abs(age - 30) < 0.01) return v30;
        if (Math.abs(age - 40) < 0.01) return v40;
        if (Math.abs(age - 50) < 0.01) return v50;
        if (Math.abs(age - 60) < 0.01) return v60;
        if (Math.abs(age - 70) < 0.01) return v70;

        // Find sector
        let s = 0, e = 80, vs = v0, ve = v80;
        if (age < 40) {
            if (age < 20) {
                if (age < 10) { s = 0; e = 10; vs = v0; ve = v10; }
                else { s = 10; e = 20; vs = v10; ve = v20; }
            } else {
                if (age < 30) { s = 20; e = 30; vs = v20; ve = v30; }
                else { s = 30; e = 40; vs = v30; ve = v40; }
            }
        } else {
            if (age < 60) {
                if (age < 50) { s = 40; e = 50; vs = v40; ve = v50; }
                else { s = 50; e = 60; vs = v50; ve = v60; }
            } else {
                if (age < 70) { s = 60; e = 70; vs = v60; ve = v70; }
                else { s = 70; e = 80; vs = v70; ve = v80; }
            }
        }

        // L1 (5)
        const mid = s + 5;
        const vMid = reduceTo22(vs + ve);
        if (Math.abs(age - mid) < 0.01) return vMid;

        let s2 = s, e2 = e, vs2 = vs, ve2 = ve;
        if (age < mid) {
            e2 = mid; ve2 = vMid;
        } else {
            s2 = mid; vs2 = vMid;
        }

        // L2 (2.5)
        const mid2 = s2 + 2.5;
        const vMid2 = reduceTo22(vs2 + ve2);
        if (Math.abs(age - mid2) < 0.01) return vMid2;

        let s3 = s2, e3 = e2, vs3 = vs2, ve3 = ve2;
        if (age < mid2) {
            e3 = mid2; ve3 = vMid2;
        } else {
            s3 = mid2; vs3 = vMid2;
        }

        // L3 (1.25)
        // The start of the 1.25 period determines the energy for that period
        const mid3 = s3 + 1.25; // 1.25 is correct? No, interval is 2.5. Half is 1.25.
        // Yes. mid3 is the point.
        // But we are looking for the energy at 'age'.
        // If 'age' is exactly a 1.25 multiple, we return the sum.
        // But the 1.25 points ARE the energies we want to list.

        // Wait, if we want to produce the table rows 0-1.25, 1.25-2.5...
        // We need the energy AT 0, AT 1.25, AT 2.5...

        // So for the table row "0 - 1.25", the Energy 1 is the value at Age 0.
        // For "1.25 - 2.5", the Energy 1 is the value at Age 1.25.

        if (Math.abs(age - s3) < 0.01) return vs3;
        // if age is e3? 
        // We need the value at the exact point.
        // Recursion logic:
        // Value at mid3 = reduce(vs3 + ve3).
        if (Math.abs(age - mid3) < 0.01) return reduceTo22(vs3 + ve3);

        return 0; // Should not happen if we iterate only on 1.25 steps
    };

    for (let i = 0; i < 64; i++) {
        const startAge = i * step;
        const endAge = (i + 1) * step;

        const yearEnergy = getVal(startAge);

        // Transition = opposite point. StartAge + 40.
        const transitionAge = (startAge + 40) % 80;
        const transitionEnergy = getVal(transitionAge);

        const shadowEnergy = reduceTo22(yearEnergy + transitionEnergy);

        // Format label: "0 - 1.25"
        // Maybe easier to read: "0 - 1y3m"
        const formatAge = (a: number) => {
            const y = Math.floor(a);
            const m = Math.round((a - y) * 12);
            if (m === 0) return `${y}`;
            if (m === 12) return `${y + 1}`;
            return `${y}y ${m}m`;
        }

        // Clean label for the table
        const label = `${Number(startAge.toFixed(2))} - ${Number(endAge.toFixed(2))}`;

        periods.push({
            startAge,
            endAge,
            label,
            yearEnergy,
            transitionEnergy,
            shadowEnergy
        });
    }

    return periods;
};
