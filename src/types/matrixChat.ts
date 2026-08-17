import type { CompatibilityMatrix, MatrixValues } from '@/core/calc';

export type MatrixChatContext =
  | { mode: 'personal' }
  | {
      mode: 'compatibility';
      compatibility: CompatibilityMatrix | Record<string, unknown>;
      personAName: string;
      personBName: string;
      personADob: string;
      personBDob: string;
      /** Combined compatibility matrix nodes (sum of both charts). */
      combinedMatrix: MatrixValues;
    };

export function getChatSessionBirthDate(
  birthDate: string | undefined,
  chatContext?: MatrixChatContext,
): string {
  if (chatContext?.mode === 'compatibility') {
    return `compat:${chatContext.personADob}:${chatContext.personBDob}`;
  }
  return birthDate || 'unknown';
}
