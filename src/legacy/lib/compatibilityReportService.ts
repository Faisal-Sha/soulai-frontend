import { supabase } from '@/integrations/supabase/client';
import type { CompatibilityMatrix, MatrixValues } from '@/core/calc';
import type { CompatibilityReportRow } from '@/types/compatibilityReport';

export { checkDeepDiveAccess } from '@/lib/deepDiveAccess';

export async function generateCompatibilityReport(params: {
  personAName: string;
  personBName: string;
  personADob: string;
  personBDob: string;
  compatibility: CompatibilityMatrix;
  combinedMatrix: MatrixValues;
  language: 'en' | 'ru';
}): Promise<{ reportId: string }> {
  const { data, error } = await supabase.functions.invoke('generate-compatibility-report', {
    body: {
      personAName: params.personAName,
      personBName: params.personBName,
      personADob: params.personADob,
      personBDob: params.personBDob,
      compatibility: params.compatibility,
      combinedMatrix: params.combinedMatrix,
      language: params.language,
    },
  });

  if (error) throw new Error(error.message);
  if (data?.error) throw new Error(data.error);
  if (!data?.reportId) throw new Error('No report ID returned');

  return { reportId: data.reportId };
}

export async function fetchCompatibilityReport(
  reportId: string,
): Promise<CompatibilityReportRow | null> {
  const { data, error } = await supabase
    .from('compatibility_reports')
    .select('*')
    .eq('id', reportId)
    .maybeSingle();

  if (error) throw error;
  return data as CompatibilityReportRow | null;
}

export async function listCompatibilityReports(): Promise<CompatibilityReportRow[]> {
  const { data, error } = await supabase
    .from('compatibility_reports')
    .select('id, title, person_a_name, person_b_name, status, created_at')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data || []) as CompatibilityReportRow[];
}
