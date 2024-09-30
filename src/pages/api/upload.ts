import { pdfile, pb } from "@/lib/pb";
import { process_pdf } from "@/utils/rag";
import type { APIRoute } from "astro";
import type { NotesResponse } from "pocketbase-types";

export const POST: APIRoute = async ({ request, redirect, url, locals }) => {
	const fd = await request.formData();
	const file = fd.get("file") as File;
	if (!file?.name) {
		console.log(`file not found: ${file}`);
		return redirect(url.toString());
	}

	const record = await pb
		.collection<NotesResponse>("notes")
		.create({
			name: file.name,
			pdf: file,
		})
		.catch((e) => console.error("Pocketbase error", e));

	if (!record?.pdf)
		return new Response('{"error": "Failed to upload PDF"}', { status: 400 });

	await process_pdf(file);
	return new Response(JSON.stringify({ filePath: pdfile(record) }));
};
