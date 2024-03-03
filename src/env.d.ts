/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly PUBLIC_LOCAL_PB_URL: string
  readonly PUBLIC_REMOTE_PB_URL: string
  readonly ADMIN_PASS: string
  readonly ADMIN_EMAIL: string
}

interface ImportMera {
  readonly env: ImportMetaEnv
}