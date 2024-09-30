/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
	readonly GOOGLE_API_KEY: string;
	readonly PINECONE_API_KEY: string;
	readonly XATA_API_KEY: string;
	
	// readonly R2_ACCOUNT_ID: string;
	// readonly R2_ACCESS_KEY_ID: string;
	// readonly R2_SECRET_ACCESS_KEY: string;
	// readonly R2_BUCKET_NAME: string;
	
	readonly POCKETBASE_BASE_URL: string;
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
