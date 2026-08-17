import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { corsHeaders, handleCors } from "../_shared/cors.ts";
import { createAdminClient } from "../_shared/supabase-client.ts";
import { isServiceRole } from "../_shared/auth.ts";
import { extractText } from "../_shared/pdf.ts";
import { chunkText, generateEmbeddings } from "../_shared/embeddings.ts";
import {
  validateFileUpload,
  ValidationError,
  safeErrorResponse,
} from "../_shared/validation.ts";

serve(async (req: Request) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!(await isServiceRole(req))) {
    return new Response(
      JSON.stringify({ error: "Unauthorized — service role key required" }),
      {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  try {
    const contentType = req.headers.get("Content-Type") || "";

    let fileBuffer: Uint8Array;
    let filename: string;
    let fileContentType: string;
    let language: string;
    let sourceUrl: string | null = null;

    if (contentType.includes("multipart/form-data")) {
      // Handle multipart form upload
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      language = (formData.get("language") as string) || "en";
      sourceUrl = (formData.get("source_url") as string) || null;

      if (!file) {
        return new Response(
          JSON.stringify({ error: "No file provided. Use 'file' form field." }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      filename = file.name;
      fileContentType = file.type || "application/pdf";
      fileBuffer = new Uint8Array(await file.arrayBuffer());
    } else if (contentType.includes("application/json")) {
      // Handle JSON body with inline text content
      const body = await req.json();
      if (!body.content || !body.filename) {
        return new Response(
          JSON.stringify({ error: "JSON body requires 'content' and 'filename'" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      filename = body.filename;
      fileContentType = body.content_type || "text/plain";
      language = body.language || "en";
      sourceUrl = body.source_url || null;
      fileBuffer = new TextEncoder().encode(body.content);
    } else {
      return new Response(
        JSON.stringify({
          error: "Unsupported Content-Type. Use multipart/form-data or application/json",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Validate file type and size
    validateFileUpload(fileContentType, fileBuffer.length);

    // Extract text from document
    console.log(`Processing ${filename} (${fileContentType}, ${fileBuffer.length} bytes)`);
    const text = await extractText(fileBuffer, fileContentType);

    if (!text.trim()) {
      return new Response(
        JSON.stringify({ error: "No text content could be extracted from the file" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Chunk the text
    const chunks = chunkText(text);
    console.log(`Split into ${chunks.length} chunks`);

    // Generate embeddings for all chunks
    const embeddings = await generateEmbeddings(chunks);
    console.log(`Generated ${embeddings.length} embeddings`);

    // Store in database
    const supabase = createAdminClient();

    // Insert document record
    const { data: doc, error: docError } = await supabase
      .from("documents")
      .insert({
        filename,
        content_type: fileContentType,
        file_size: fileBuffer.length,
        total_chunks: chunks.length,
        language,
        source_url: sourceUrl,
        metadata: { original_text_length: text.length },
      })
      .select()
      .single();

    if (docError) throw new Error(`Failed to save document: ${docError.message}`);

    // Insert chunks with embeddings
    const chunkRecords = chunks.map((content, index) => ({
      document_id: doc.id,
      chunk_index: index,
      content,
      embedding: JSON.stringify(embeddings[index]),
      token_count: Math.ceil(content.length / 4),
      metadata: { filename, chunk_of: chunks.length },
    }));

    // Insert in batches of 20 to avoid payload limits
    const BATCH_SIZE = 20;
    for (let i = 0; i < chunkRecords.length; i += BATCH_SIZE) {
      const batch = chunkRecords.slice(i, i + BATCH_SIZE);
      const { error: chunkError } = await supabase
        .from("document_chunks")
        .insert(batch);
      if (chunkError) {
        throw new Error(`Failed to save chunks (batch ${i}): ${chunkError.message}`);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        document: {
          id: doc.id,
          filename: doc.filename,
          language: doc.language,
          total_chunks: chunks.length,
          text_length: text.length,
        },
      }),
      {
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    const message = safeErrorResponse(error, "Upload document error");
    const status = error instanceof ValidationError ? 400 : 500;
    return new Response(
      JSON.stringify({ error: message }),
      {
        status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

// Force deploy
