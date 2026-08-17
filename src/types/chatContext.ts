import type { CompatibilityMatrix } from '@/core/calc';

export type PersonalChatContext = {
  mode: 'personal';
};

export type CompatibilityChatContext = {
  mode: 'compatibility';
  compatibility: CompatibilityMatrix | Record<string, unknown>;
  personAName: string;
  personBName: string;
  personADob: string;
  personBDob: string;
};

export type MatrixChatContext = PersonalChatContext | CompatibilityChatContext;

export function getChatSessionBirthDate(
  birthDate: string | undefined,
  chatContext?: MatrixChatContext,
): string {
  if (chatContext?.mode === 'compatibility') {
    return `compat:${chatContext.personADob}:${chatContext.personBDob}`;
  }
  return birthDate || 'unknown';
}
