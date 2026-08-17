-- Make the readings storage bucket private.
-- PDFs must be accessed via signed URLs only (generated server-side by generate-pdf).
-- This prevents unauthenticated users from downloading PDFs directly via the public URL.

UPDATE storage.buckets
SET public = false
WHERE id = 'readings';
