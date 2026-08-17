// Matrix of Destiny calculation engine

import { sumDigits, reduceTo22Strict as reduceTo22, reduce9 } from "./utils";

export interface MatrixValues {
  // Основные энергии (Primary positions)
  a: number;      // Зона ресурса (день рождения)
  b: number;      // Главный талант (месяц)
  c: number;      // Задача души (год)
  d: number;      // Главная проработка
  e: number;      // Зона комфорта души

  // Родовые программы по мужскому роду (Male lineage)
  f: number;
  y: number;
  o: number;

  // Родовые программы по женскому роду (Female lineage)
  g: number;
  k: number;
  u: number;

  // Зона родительско-детских отношений (Parent-child relations)
  a1: number;
  a2: number;

  // Кармический хвост (Karmic tail)
  d1: number;
  d2: number;

  // Линия благополучия (Prosperity line)
  c1: number;
  c2: number;
  x: number;
  x1: number;
  x2: number;

  // Программа сексуальности (Sexuality program)
  e1: number;
  e2: number;

  // Дополнительные точки родовых линий (Additional lineage points)
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  p1: number;
  p2: number;
  p3: number;
  p4: number;

  // Таланты от бога (Divine talents)
  b1: number;
  b2: number;

  // Предназначение 20-40 лет (Purpose 20-40 years)
  h: number;
  j: number;
  m: number;

  // Предназначение 40-60 лет (Purpose 40-60 years)
  n: number;
  t: number;
  z: number;

  // Предназначение после 60 лет (Purpose 60+ years)
  s: number;

  // Таблица здоровья - Анахата (Health table - Anahata)
  a3: number;
  b3: number;

  // Промежуточные точки линий c и d (Intermediate points for lines c and d)
  c3: number;
  d3: number;

  // Таблица здоровья - Эмоции (Health table - Emotions)
  l: number;
  l1: number;
  l2: number;
  l3: number;
  l4: number;
  l5: number;
  l6: number;

  // Таблица здоровья - Итоги (Health table - Totals)
  healthPhysTotal: number;
  healthEnergyTotal: number;
  healthBalanceTotal: number;

  // Legacy compatibility fields
  center: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
  money: number;
  love: number;
  health: number;
}

export type DOB = { day: number; month: number; year: number };

export interface CalcOptions {
  keepMasters?: boolean;
  centerMode?: "avatarium" | "classic";
}

/**
 * Parse date of birth string into day, month, year
 * Supports formats: YYYY-MM-DD (ISO) and DD/MM/YYYY (or DD-MM-YYYY, DD.MM.YYYY)
 */
import { validateDOB } from '../lib/dateValidation';

export const parseDOB = (s: string): DOB => {
  // First try DD/MM/YYYY format
  let validation = validateDOB(s, { format: 'DD/MM/YYYY' });

  // If that fails, try YYYY-MM-DD format
  if (!validation.isValid && /^\d{4}-\d{2}-\d{2}$/.test(s)) {
    validation = validateDOB(s, { format: 'YYYY-MM-DD' });
  }

  if (!validation.isValid) {
    throw new Error(validation.error || "Invalid date format");
  }

  if (!validation.parsedDate) {
    throw new Error("Failed to parse date");
  }

  return {
    day: validation.parsedDate.getDate(),
    month: validation.parsedDate.getMonth() + 1, // Convert to 1-indexed
    year: validation.parsedDate.getFullYear()
  };
};

/**
 * Calculate Matrix of Destiny values per Ladini specification
 * E1 = Sum all birth date digits, reduced to 1-22
 * E2 = day + month, reduced to 1-22
 * E3 = Sum year digits, reduced to 1-22
 * E4 = E1 - (day+month raw), if negative add 22
 * E5 = E1 + E3, reduced to 1-22
 * 
 * Position mapping:
 * CENTER = E4 (E1 - day+month, adjusted)
 * LEFT = day (or reduceTo22(day) if >22)
 * TOP = month
 * RIGHT = E3
 * BOTTOM = E1
 * MONEY = reduceTo22(right + day)
 * LOVE = reduceTo22(top + right)
 */
/**
 * Core matrix derivation logic from the 5 primary points
 * Ensures that all matrices (personal or compatibility) follow the same internal geometry
 */
const deriveMatrixFromBasePoints = (a: number, b: number, c: number, d: number, e: number): MatrixValues => {
  // ============= РОДОВЫЕ ПРОГРАММЫ ПО МУЖСКОМУ РОДУ (Male Lineage) =============
  const f = reduceTo22(a + b);
  const y = reduceTo22(c + d);
  const o = reduceTo22(f + y);

  // ============= РОДОВЫE ПРОГРАММЫ ПО ЖЕНСКОМУ РОДУ (Female Lineage) =============
  const g = reduceTo22(b + c);
  const k = reduceTo22(a + d);
  const u = reduceTo22(g + k);

  // ============= ЗОНА РОДИТЕЛЬСКО-ДЕТСКИХ ОТНОШЕНИЙ (Parent-Child Relations) =============
  const a1 = reduceTo22(a + e);
  const a2 = reduceTo22(a + a1);

  // ============= КАРМИЧЕСКИЙ ХВОСТ (Karmic Tail) =============
  const d1 = reduceTo22(d + e);
  const d2 = reduceTo22(d + d1);

  // ============= ЛИНИЯ БЛАГОПОЛУЧИЯ (Prosperity Line) =============
  const c1 = reduceTo22(c + e);
  const x = reduceTo22(d1 + c1);
  const x1 = reduceTo22(d1 + x);
  const c2 = reduceTo22(c + c1);
  const x2 = reduceTo22(x + c1);

  // ============= ПРОГРАММА СЕКСУАЛЬНОСТИ (Sexuality Program) =============
  const e1 = reduceTo22(f + g + y + k);
  const e2 = reduceTo22(e + e1);

  // ============= ДОПОЛНИТЕЛЬНЫЕ ТОЧКИ РОДОВЫХ ЛИНИЙ (Additional Lineage Points) =============
  const s1 = reduceTo22(e1 + f);
  const s2 = reduceTo22(f + s1);
  const s4 = reduceTo22(y + e1);
  const s3 = reduceTo22(y + s4);
  const p1 = reduceTo22(g + e1);
  const p2 = reduceTo22(g + p1);
  const p3 = reduceTo22(k + e1);
  const p4 = reduceTo22(k + p3);

  // ============= ТАЛАНТЫ ОТ БОГА (Divine Talents) =============
  const b1 = reduceTo22(b + e);
  const b2 = reduceTo22(b + b1);

  // ============= ПРЕДНАЗНАЧЕНИЕ 20-40 ЛЕТ (Purpose 20-40 years) =============
  const h = reduceTo22(b + d);
  const j = reduceTo22(a + c);
  const m = reduceTo22(h + j);

  // ============= ПРЕДНАЗНАЧЕНИЕ 40-60 ЛЕТ (Purpose 40-60 years) =============
  const n = reduceTo22(f + y);
  const t = reduceTo22(g + k);
  const z = reduceTo22(n + t);

  // ============= ПРЕДНАЗНАЧЕНИЕ ПОСЛЕ 60 ЛЕТ (Purpose 60+ years) =============
  const s = reduceTo22(m + z);

  // ============= ТАБЛИЦА ЗДОРОВЬЯ - АНАХАТА (Health Table - Anahata) =============
  const a3 = reduceTo22(a1 + e);
  const b3 = reduceTo22(b1 + e);

  // ============= ПРОМЕЖУТОЧНЫЕ ТОЧКИ ЛИНИЙ c И d =============
  const c3 = reduceTo22(c1 + e);
  const d3 = reduceTo22(d1 + e);

  // ============= ТАБЛИЦА ЗДОРОВЬЯ - ЭМОЦИИ (Health Table - Emotions) =============
  const l = reduceTo22(a + b);
  const l1 = reduceTo22(a2 + b2);
  const l2 = reduceTo22(a1 + b1);
  const l3 = reduceTo22(a3 + b3);
  const l4 = reduceTo22(e + e);
  const l5 = reduceTo22(d1 + c1);
  const l6 = reduceTo22(d + c);

  // ============= ТАБЛИЦА ЗДОРОВЬЯ - ИТОГИ (Health Table - Totals) =============
  const healthPhysTotal = reduceTo22(a + a2 + a1 + a3 + e + c1 + c);
  const healthEnergyTotal = reduceTo22(b + b2 + b1 + b3 + e + d1 + d);
  const healthBalanceTotal = reduceTo22(l + l1 + l2 + l3 + l4 + l5 + l6);

  // ============= LEGACY COMPATIBILITY FIELDS =============
  const center = e;
  const left = a;
  const top = b;
  const right = c;
  const bottom = d;
  const money = reduceTo22(right + a);
  const love = reduceTo22(top + right);
  const health = center;

  return {
    a, b, c, d, e,
    f, y, o, g, k, u,
    a1, a2, d1, d2,
    c1, c2, x, x1, x2,
    e1, e2,
    s1, s2, s3, s4, p1, p2, p3, p4,
    b1, b2, h, j, m, n, t, z, s,
    a3, b3, l, l1, l2, l3, l4, l5, l6,
    healthPhysTotal, healthEnergyTotal, healthBalanceTotal,
    c3, d3,
    center, top, left, right, bottom, money, love, health
  };
};

/**
 * Calculate Matrix of Destiny values per Ladini specification
 */
export const calcMatrix = ({ day, month, year }: DOB): MatrixValues => {
  // ============= ОСНОВНЫЕ ЭНЕРГИИ (Primary Energies) =============
  // a - Зона ресурса (Resource zone): день рождения
  const a = reduceTo22(day);

  // b - Главный талант (Main talent): месяц рождения
  const b = month;

  // c - Задача души (Soul task): сумма цифр года рождения
  const c = reduceTo22(
    String(year).split('').reduce((sum, digit) => sum + parseInt(digit), 0)
  );

  // d - Главная проработка (Main processing)
  const d = reduceTo22(a + b + c);

  // e - Зона комфорта души (Soul comfort zone)
  const e = reduceTo22(a + b + c + d);

  return deriveMatrixFromBasePoints(a, b, c, d, e);
};

/**
 * Strategy hooks for Money and Love calculations
 * These can be overridden for specific variants without breaking the engine
 */
export interface FormulaHooks {
  computeMoney?: (day: number, month: number, right: number, center: number) => number;
  computeLove?: (day: number, month: number, right: number, center: number) => number;
}

/**
 * Default Money calculation: reduceTo22(right + left)
 * Can be overridden via hooks for custom implementations
 */
export const defaultComputeMoney = (day: number, month: number, right: number, center: number): number => {
  return reduceTo22(right + day);
};

/**
 * Default Love calculation: reduceTo22(top + right)
 * Can be overridden via hooks for custom implementations
 */
export const defaultComputeLove = (day: number, month: number, right: number, center: number): number => {
  return reduceTo22(month + right);
};

/**
 * Self-tests for Ladini specification compliance
 * These MUST match the exact values from the specification
 */
export const runSelfTests = () => {
  const test = (d: number, m: number, y: number) => calcMatrix({ day: d, month: m, year: y });
  console.log("TEST 17/01/1993 →", test(17, 1, 1993)); // Expected: center:8, top:1, left:17, right:22, bottom:4, money:12, love:5
  console.log("TEST 26/07/1991 →", test(26, 7, 1991)); // Expected: center:7, top:7, left:8, right:20, bottom:8, money:10, love:9
  console.log("TEST 27/07/1991 →", test(27, 7, 1991)); // Expected: center:9, top:7, left:9, right:20, bottom:9, money:11, love:9
  console.log("TEST 24/05/1971 →", test(24, 5, 1971)); // Expected: center:4, top:5, left:6, right:18, bottom:11, money:6, love:5
};

/**
 * Unit tests that must pass exactly per Ladini specification
 */
export const validateLadiniTests = () => {
  const tests = [
    { dob: { day: 17, month: 1, year: 1993 }, expected: { center: 8, top: 1, left: 17, right: 22, bottom: 4, money: 12, love: 5 } },
    { dob: { day: 26, month: 7, year: 1991 }, expected: { center: 7, top: 7, left: 8, right: 20, bottom: 8, money: 10, love: 9 } },
    { dob: { day: 27, month: 7, year: 1991 }, expected: { center: 9, top: 7, left: 9, right: 20, bottom: 9, money: 11, love: 9 } },
    { dob: { day: 24, month: 5, year: 1971 }, expected: { center: 4, top: 5, left: 6, right: 18, bottom: 11, money: 6, love: 5 } }
  ];

  return tests.map(({ dob, expected }) => {
    const result = calcMatrix(dob);
    const passed = Object.keys(expected).every(key =>
      result[key as keyof MatrixValues] === expected[key as keyof typeof expected]
    );
    return { dob, expected, result, passed };
  });
};

/**
 * Compatibility matrix calculation per Ladini specification
 */
export interface CompatibilityMatrix {
  personA: MatrixValues;
  personB: MatrixValues;
  pairCenter: number;
  relationshipEnergy: number;
  challengeArea: number;
  harmonyArea: number;
  growthPotential: number;
  communicationStyle: number;
}

export const calcCompatibility = (dobA: DOB, dobB: DOB): CompatibilityMatrix => {
  const personA = calcMatrix(dobA);
  const personB = calcMatrix(dobB);

  // Standard compatibility indicators use composite root sums
  const compA = reduceTo22(personA.a + personB.a);
  const compB = reduceTo22(personA.b + personB.b);
  const compC = reduceTo22(personA.c + personB.c);
  const compD = reduceTo22(personA.d + personB.d);
  const compE = reduceTo22(personA.e + personB.e);

  // We return specific metrics based on these composite notes
  return {
    personA,
    personB,
    pairCenter: compE,
    relationshipEnergy: reduceTo22(compB + compC), // Conventional "Love" indicator often uses month+year sum
    challengeArea: reduceTo22(Math.abs(personA.c - personB.c)), // Reverting to absolute difference for "Lesson"
    harmonyArea: compB,
    growthPotential: compD,
    communicationStyle: compA
  };
};

/**
 * Calculate Compatibility Matrix between two people
 * All individual matrix values are summed together and reduced to 22
 */
export const calcCompatibilityMatrix = (dob1: DOB, dob2: DOB): MatrixValues => {
  const matrix1 = calcMatrix(dob1);
  const matrix2 = calcMatrix(dob2);

  // 1. Sum original primary anchors (A, B, C, D, E)
  const a = reduceTo22(matrix1.a + matrix2.a);
  const b = reduceTo22(matrix1.b + matrix2.b);
  const c = reduceTo22(matrix1.c + matrix2.c);
  const d = reduceTo22(matrix1.d + matrix2.d);
  const e = reduceTo22(matrix1.e + matrix2.e);

  // 2. Derive base matrix from these points
  const matrix = deriveMatrixFromBasePoints(a, b, c, d, e);

  // 3. Override diagonal anchors with their SUMS (Crucial for nodes like 'y' and 'k' to match Avatarium)
  matrix.f = reduceTo22(matrix1.f + matrix2.f);
  matrix.g = reduceTo22(matrix1.g + matrix2.g);
  matrix.y = reduceTo22(matrix1.y + matrix2.y);
  matrix.k = reduceTo22(matrix1.k + matrix2.k);

  // 4. Recalculate nodes that depend on these diagonal anchors to maintain consistency
  matrix.o = reduceTo22(matrix.f + matrix.y);
  matrix.u = reduceTo22(matrix.g + matrix.k);
  matrix.e1 = reduceTo22(matrix.f + matrix.g + matrix.y + matrix.k);
  matrix.e2 = reduceTo22(matrix.e + matrix.e1);
  matrix.n = reduceTo22(matrix.f + matrix.y);
  matrix.t = reduceTo22(matrix.g + matrix.k);
  matrix.z = reduceTo22(matrix.n + matrix.t);
  matrix.s = reduceTo22(matrix.m + matrix.z);

  // Ancestra intermediate points depend on e1 and corner nodes
  matrix.s1 = reduceTo22(matrix.e1 + matrix.f);
  matrix.s2 = reduceTo22(matrix.f + matrix.s1);
  matrix.s4 = reduceTo22(matrix.y + matrix.e1);
  matrix.s3 = reduceTo22(matrix.y + matrix.s4);
  matrix.p1 = reduceTo22(matrix.g + matrix.e1);
  matrix.p2 = reduceTo22(matrix.g + matrix.p1);
  matrix.p3 = reduceTo22(matrix.k + matrix.e1);
  matrix.p4 = reduceTo22(matrix.k + matrix.p3);

  return matrix;
};

/**
 * Calculate MOTD Matrix specifically for Message of the Day
 * This uses a "fully end-to-end" summation for requested nodes
 */
export const calcMOTDMatrix = (dobUser: DOB, dobToday: DOB): MatrixValues => {
  const m1 = calcMatrix(dobUser);
  const m2 = calcMatrix(dobToday);

  // 1. Sum original primary anchors (A, B, C, D, E)
  const a = reduceTo22(m1.a + m2.a);
  const b = reduceTo22(m1.b + m2.b);
  const c = reduceTo22(m1.c + m2.c);
  const d = reduceTo22(m1.d + m2.d);
  const e = reduceTo22(m1.e + m2.e);

  // 2. Derive base matrix from these points
  const matrix = deriveMatrixFromBasePoints(a, b, c, d, e);

  // 3. Override ALL other nodes with their SUMS (The "prev best" version)
  // This ensures that nodes like 's' are included accurately
  Object.keys(matrix).forEach((key) => {
    const val1 = (m1 as any)[key];
    const val2 = (m2 as any)[key];
    if (typeof val1 === 'number' && typeof val2 === 'number') {
      (matrix as any)[key] = reduceTo22(val1 + val2);
    }
  });

  return matrix;
};

