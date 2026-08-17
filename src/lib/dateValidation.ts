import { isValid, isBefore, isAfter, parseISO, format, parse } from 'date-fns';

export interface DateValidationResult {
  isValid: boolean;
  error?: string;
  parsedDate?: Date;
}

export interface DOBValidationOptions {
  minAge?: number;
  maxAge?: number;
  allowFuture?: boolean;
  format?: 'DD/MM/YYYY' | 'YYYY-MM-DD';
}

/**
 * Comprehensive date of birth validation
 */
export const validateDOB = (
  dateString: string, 
  options: DOBValidationOptions = {}
): DateValidationResult => {
  const {
    minAge = 0,
    maxAge = 150,
    allowFuture = false,
    format: dateFormat = 'DD/MM/YYYY'
  } = options;

  // Check if date string is empty
  if (!dateString || dateString.trim() === '') {
    return {
      isValid: false,
      error: 'Date of birth is required'
    };
  }

  let parsedDate: Date;

  try {
    // Parse based on format
    if (dateFormat === 'DD/MM/YYYY') {
      // Handle DD/MM/YYYY format
      const parts = dateString.split(/[\/\-\.]/);
      if (parts.length !== 3) {
        return {
          isValid: false,
          error: 'Please enter date in DD/MM/YYYY format'
        };
      }

      const [day, month, year] = parts.map(p => parseInt(p, 10));
      
      // Basic number validation
      if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return {
          isValid: false,
          error: 'Please enter valid numbers for day, month, and year'
        };
      }

      // Create date object (month is 0-indexed in JS Date)
      parsedDate = new Date(year, month - 1, day);
      
      // Check if the date components match (handles invalid dates like Feb 30)
      if (parsedDate.getDate() !== day || 
          parsedDate.getMonth() !== month - 1 || 
          parsedDate.getFullYear() !== year) {
        return {
          isValid: false,
          error: 'Invalid date - please check day, month, and year'
        };
      }
    } else {
      // Handle YYYY-MM-DD format
      parsedDate = parseISO(dateString);
    }

    // Check if date is valid
    if (!isValid(parsedDate)) {
      return {
        isValid: false,
        error: 'Invalid date format'
      };
    }

    const today = new Date();
    const currentYear = today.getFullYear();
    const birthYear = parsedDate.getFullYear();

    // Check year bounds
    if (birthYear < 1900 || birthYear > currentYear + (allowFuture ? 1 : 0)) {
      return {
        isValid: false,
        error: `Year must be between 1900 and ${currentYear}${allowFuture ? ' (or next year)' : ''}`
      };
    }

    // Check if date is in the future (unless allowed)
    if (!allowFuture && isAfter(parsedDate, today)) {
      return {
        isValid: false,
        error: 'Date of birth cannot be in the future'
      };
    }

    // Calculate age
    const age = currentYear - birthYear;
    
    // Check age bounds
    if (age < minAge) {
      return {
        isValid: false,
        error: `Age must be at least ${minAge} years`
      };
    }

    if (age > maxAge) {
      return {
        isValid: false,
        error: `Age cannot exceed ${maxAge} years`
      };
    }

    // Additional validation for very recent dates
    if (age === 0) {
      const monthsDiff = (today.getFullYear() - birthYear) * 12 + today.getMonth() - parsedDate.getMonth();
      if (monthsDiff < 0) {
        return {
          isValid: false,
          error: 'Date of birth cannot be in the future'
        };
      }
    }

    return {
      isValid: true,
      parsedDate
    };

  } catch (error) {
    return {
      isValid: false,
      error: 'Invalid date format'
    };
  }
};

/**
 * Format date for display (DD/MM/YYYY)
 */
export const formatDateForDisplay = (date: Date): string => {
  return format(date, 'dd/MM/yyyy');
};

/**
 * Format date for storage (YYYY-MM-DD)
 */
export const formatDateForStorage = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

/**
 * Parse DOB string and return structured date object
 */
export const parseDOBSafe = (dateString: string): { day: number; month: number; year: number } | null => {
  const validation = validateDOB(dateString);
  
  if (!validation.isValid || !validation.parsedDate) {
    return null;
  }

  return {
    day: validation.parsedDate.getDate(),
    month: validation.parsedDate.getMonth() + 1, // Convert back to 1-indexed
    year: validation.parsedDate.getFullYear()
  };
};

/**
 * Validate date input during typing (for real-time feedback)
 */
export const validateDateInput = (input: string): { isValid: boolean; error?: string } => {
  // Allow partial input during typing
  if (input.length < 10) {
    return { isValid: true }; // Don't show errors while typing
  }

  const validation = validateDOB(input);
  return {
    isValid: validation.isValid,
    error: validation.error
  };
};