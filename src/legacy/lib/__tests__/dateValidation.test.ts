import { describe, test, expect } from 'vitest';
import { validateDOB, parseDOBSafe } from '../dateValidation';

describe('Date Validation', () => {
  describe('validateDOB', () => {
    test('should accept valid dates', () => {
      const result = validateDOB('15/06/1990');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
      expect(result.parsedDate).toBeDefined();
    });

    test('should reject invalid dates', () => {
      const testCases = [
        { input: '32/01/1990', expectedError: 'Invalid date - please check day, month, and year' },
        { input: '29/02/2023', expectedError: 'Invalid date - please check day, month, and year' }, // Not a leap year
        { input: '15/13/1990', expectedError: 'Invalid date - please check day, month, and year' },
        { input: '01/01/2050', expectedError: 'Year must be between 1900 and' },
        { input: '01/01/1800', expectedError: 'Year must be between 1900 and' },
        { input: '', expectedError: 'Date of birth is required' },
        { input: '15/06', expectedError: 'Please enter date in DD/MM/YYYY format' },
      ];

      testCases.forEach(({ input, expectedError }) => {
        const result = validateDOB(input);
        expect(result.isValid).toBe(false);
        expect(result.error).toContain(expectedError);
      });
    });

    test('should handle leap years correctly', () => {
      // Valid leap year
      const validLeap = validateDOB('29/02/2020');
      expect(validLeap.isValid).toBe(true);

      // Invalid leap year
      const invalidLeap = validateDOB('29/02/2021');
      expect(invalidLeap.isValid).toBe(false);
    });

    test('should validate age bounds', () => {
      const tooOld = validateDOB('01/01/1850', { maxAge: 150 });
      expect(tooOld.isValid).toBe(false);
      expect(tooOld.error).toContain('Year must be between 1900 and');
    });

    test('should handle YYYY-MM-DD format', () => {
      const result = validateDOB('1990-06-15', { format: 'YYYY-MM-DD' });
      expect(result.isValid).toBe(true);
      expect(result.parsedDate?.getFullYear()).toBe(1990);
      expect(result.parsedDate?.getMonth()).toBe(5); // 0-indexed
      expect(result.parsedDate?.getDate()).toBe(15);
    });
  });

  describe('parseDOBSafe', () => {
    test('should parse valid dates', () => {
      const result = parseDOBSafe('15/06/1990');
      expect(result).toEqual({ day: 15, month: 6, year: 1990 });
    });

    test('should return null for invalid dates', () => {
      const result = parseDOBSafe('32/01/1990');
      expect(result).toBeNull();
    });
  });
});