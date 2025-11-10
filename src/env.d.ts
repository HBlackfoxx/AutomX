/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_N8N_WEBHOOK_URL: string;
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_GHOST_API_URL?: string;
  readonly PUBLIC_GHOST_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
