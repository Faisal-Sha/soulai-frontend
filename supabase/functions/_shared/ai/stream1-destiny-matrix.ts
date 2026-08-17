import { SupabaseClient } from "https://esm.sh/@supabase/supabase-client@2";
import { MatrixValues } from "../core/calc.ts";
import { reduceTo22 } from "../core/utils.ts";

export interface Stream1Result {
  matrixData: any;
  interpretations: string[];
}

export async function runDestinyMatrixStream(
  supabase: SupabaseClient,
  matrix: MatrixValues,
  dob: { day: number; month: number; year: number },
  topic: string
): Promise<string> {
  console.log(`[Stream 1] Starting Destiny Matrix stream for topic: ${topic}`);

  const currentYear = new Date().getFullYear();
  const personalYear = reduceTo22(dob.day + dob.month + currentYear);

  // Define the positions we want to query based on the spec
  const positionsToQuery = [
    { name: "center", arcana: matrix.e },
    { name: "karma", arcana: matrix.a },
    { name: "talent", arcana: matrix.b },
    { name: "soul", arcana: matrix.c },
    { name: "personal_year", arcana: personalYear },
  ];

  try {
    const results = await Promise.all(
      positionsToQuery.map(pos => 
        supabase
          .from("destiny_matrix_interpretations")
          .select("interpretation_text")
          .eq("arcana_number", pos.arcana)
          .eq("topic", topic)
          .eq("position", pos.name)
          .maybeSingle()
      )
    );

    const interpretationBlocks = results
      .map((res, i) => {
        if (res.data) {
          return `[${positionsToQuery[i].name.toUpperCase()}]: ${res.data.interpretation_text}`;
        }
        return `[${positionsToQuery[i].name.toUpperCase()}]: (No proprietary interpretation found for Arcana ${positionsToQuery[i].arcana})`;
      })
      .join("\n\n");

    return interpretationBlocks || "No Destiny Matrix data found in knowledge base.";
  } catch (error) {
    console.error("[Stream 1] Error querying Supabase:", error);
    return "Error retrieving Destiny Matrix interpretations.";
  }
}
