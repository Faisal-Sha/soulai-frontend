/**
 * Input validation and sanitization utilities for edge functions.
 */

const NAME_PATTERN = /^[\p{L}\p{M}\s\-'\.]{1,100}$/u;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const VALID_LANGUAGES = ["en", "ru"];
const MAX_MATRIX_VALUE = 22;
const MIN_MATRIX_VALUE = 0;
const ALLOWED_UPLOAD_TYPES = [
  "application/pdf",
  "text/plain",
  "text/markdown",
  "text/csv",
];
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB
const MAX_QUERY_LENGTH = 5000;

export function sanitizeName(name: string | undefined): string | undefined {
  if (!name) return undefined;
  const cleaned = name.replace(/[\n\r\t]/g, " ").trim().substring(0, 100);
  if (!NAME_PATTERN.test(cleaned)) {
    throw new ValidationError("Invalid name format — only letters, spaces, hyphens, and apostrophes allowed");
  }
  return cleaned;
}

export function validateBirthDate(date: string): string {
  if (!date || !DATE_PATTERN.test(date)) {
    throw new ValidationError("Invalid date format — use YYYY-MM-DD");
  }
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) {
    throw new ValidationError("Invalid date value");
  }
  return date;
}

export function validateMatrix(matrix: Record<string, unknown>): Record<string, number> {
  if (!matrix || typeof matrix !== "object") {
    throw new ValidationError("Matrix is required and must be an object");
  }

  const validated: Record<string, number> = {};
  for (const [key, value] of Object.entries(matrix)) {
    if (typeof value !== "number" || !Number.isInteger(value)) {
      throw new ValidationError(`Matrix value '${key}' must be an integer`);
    }
    if (value < MIN_MATRIX_VALUE || value > MAX_MATRIX_VALUE) {
      throw new ValidationError(`Matrix value '${key}' must be between ${MIN_MATRIX_VALUE} and ${MAX_MATRIX_VALUE}`);
    }
    validated[key] = value;
  }
  return validated;
}

export function validateLanguage(language: string): string {
  if (!VALID_LANGUAGES.includes(language)) {
    throw new ValidationError(`Language must be one of: ${VALID_LANGUAGES.join(", ")}`);
  }
  return language;
}

export function validateQuery(query: string): string {
  if (!query || typeof query !== "string") {
    throw new ValidationError("Query is required");
  }
  if (query.length > MAX_QUERY_LENGTH) {
    throw new ValidationError(`Query must be under ${MAX_QUERY_LENGTH} characters`);
  }
  return query.trim();
}

export function validateSearchParams(params: {
  limit?: number;
  threshold?: number;
}): { limit: number; threshold: number } {
  const limit = params.limit ?? 5;
  const threshold = params.threshold ?? 0.5;

  if (typeof limit !== "number" || limit < 1 || limit > 50) {
    throw new ValidationError("Limit must be between 1 and 50");
  }
  if (typeof threshold !== "number" || threshold < 0 || threshold > 1) {
    throw new ValidationError("Threshold must be between 0 and 1");
  }
  return { limit: Math.floor(limit), threshold };
}

export function validateFileUpload(
  contentType: string,
  size: number
): void {
  if (!ALLOWED_UPLOAD_TYPES.includes(contentType)) {
    throw new ValidationError(
      `Unsupported file type '${contentType}'. Allowed: ${ALLOWED_UPLOAD_TYPES.join(", ")}`
    );
  }
  if (size > MAX_FILE_SIZE) {
    throw new ValidationError(
      `File too large (${(size / 1024 / 1024).toFixed(1)} MB). Maximum: ${MAX_FILE_SIZE / 1024 / 1024} MB`
    );
  }
  if (size === 0) {
    throw new ValidationError("File is empty");
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

/**
 * Returns a safe error message for client responses.
 * Logs the full error server-side.
 */
export function safeErrorResponse(error: unknown, context: string): string {
  if (error instanceof ValidationError) {
    return error.message;
  }
  console.error(`${context}:`, error);
  return "An internal error occurred. Please try again later.";
}
