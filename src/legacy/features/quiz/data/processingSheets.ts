// Optional bottom sheets shown during the processing animation.
// sheet_id values are sent to Amplitude as SoulProcessingSheetViewed / Answered.
// Kept empty — mid-processing questions were rendering broken over /quiz/processing
// (parent .quiz-tx-slide transform breaks position:fixed). Re-add here if needed later.

export interface ProcessingSheetOption {
  value: string
  label: string
}

export interface ProcessingSheetConfig {
  id: string
  /** Show when this step index becomes active (0-based, matches AnalyzingScreen STEPS) */
  showAtStep: number
  question: string
  options: ProcessingSheetOption[]
}

export const PROCESSING_SHEETS: ProcessingSheetConfig[] = []
