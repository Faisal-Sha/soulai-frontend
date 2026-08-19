export interface CompatibilityReportSection {
  id: string;
  title: string;
  highlight: string;
  explorePrompt: string;
  deepTopics: string[];
}

export interface CompatibilityReportContent {
  title: string;
  summary: string;
  karmicScore: number;
  karmicLabel: string;
  sections: CompatibilityReportSection[];
  aiStarterQuestions: string[];
  strengths: string[];
  frictionPoints: string[];
  timingInsight: string;
}

/** List view / full row from compatibility_reports */
export interface CompatibilityReportRow {
  id: string;
  user_id?: string;
  title: string;
  person_a_name?: string | null;
  person_b_name?: string | null;
  person_a_dob: string | null;
  person_b_dob: string | null;
  matrix_data: {
    compatibility: Record<string, unknown>;
    combinedMatrix: Record<string, unknown>;
  };
  content: CompatibilityReportContent | null;
  status: 'processing' | 'ready' | 'failed';
  created_at: string;
}
