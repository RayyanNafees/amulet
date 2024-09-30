import { pb } from "@/lib/pb";
import { parseRegistrationCard } from "@/utils/registeration-card";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import type { APIRoute } from "astro";
import { ClientResponseError } from "pocketbase";
import type { RegistrationCardsRecord } from "pocketbase-types";
import * as v from "valibot";

const checkIfRegistrationExists = async (enroll: string) => {
	const record = await pb
		.collection("registration_cards")
		.getFirstListItem<RegistrationCardsRecord>(`enroll="${enroll}"`)
		.catch((e: ClientResponseError) => {
			if (e instanceof ClientResponseError && e.status === 404)
				return { raw: undefined };
		});
	return record?.raw;
};

export const GET: APIRoute = async ({ params: { enroll }, request }) => {
	if (!enroll)
		return new Response(`User Not found for enrollment no: ${enroll}`, {
			status: 404,
		});
	const enrollment_no = v.parse(v.pipe(v.string(), v.length(6)), enroll);

	let data: string;
	const existing_data = await checkIfRegistrationExists(enroll);
	if (existing_data) data = existing_data;
	else {
		const file = await fetch("https://ctengg.amu.ac.in/web/reg_record.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				fac: enrollment_no,
				sem: new Date().getMonth() > 6 ? "odd" : "even",
				submit: "Download",
			}),
		}).then((r) => r.blob());

		const pdf_loader = new PDFLoader(file, { splitPages: true });
		const pages = await pdf_loader.load();
		data = pages[0].pageContent;
		await pb
			.collection("registration_cards")
			.create<RegistrationCardsRecord>({
				enroll,
				sem: new Date().getMonth() > 6 ? "odd" : "even",
				raw: data,
			})
			.catch((e) => {
				console.error(`error while creating registration, ${e}`);
				return e;
			});
	}

	const dataArr = data.split("\n");

	if (new URL(request.url).searchParams.get("raw"))
		return new Response(data, { status: 200 });

	if (new URL(request.url).searchParams.get("raw-list"))
		return new Response(JSON.stringify(dataArr), { status: 200 });

	return new Response(JSON.stringify(parseRegistrationCard(dataArr)), {
		status: 200,
		headers:	{
			'Content-Type':'application/json',
		}
	});
};
