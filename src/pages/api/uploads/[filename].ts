import type { APIRoute } from "astro";
import { pdfile, pb } from "@/lib/pb";
import type { NotesResponse } from "pocketbase-types";

export const GET: APIRoute = async ({ params: { filename } }) => {
	if (!filename) {
		console.log("No File name", filename);
		return new Response(JSON.stringify({ error: "Filename not given" }), {
			status: 400,
		});
	}

	console.log({ filename });

	const record = await pb
		.collection("notes")
		.getFirstListItem<NotesResponse>(`name="${filename}"`);
	if (!record.pdf)
		return new Response('{"error": "No pdf found"}', { status: 404 });
	// const file = fs.readFileSync(filePath);
	return new Response(pdfile(record));
};
