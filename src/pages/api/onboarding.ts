import { $subjects, $user } from "@/stores/user";
import type { APIRoute } from "astro";
import * as v from "valibot";

export const POST: APIRoute = async ({ request, redirect, url }) => {
	const enroll = await request
		.formData()
		.then((fd) => fd.get("enroll") as string);
	console.log({ enroll });
	const data = await fetch(`${url.origin}/api/user/info/${enroll}`)
		.then((r) => r.json())
		.then((r) => {
			r.year =
				((new Date().getFullYear() % 2000) - +r.faculty.slice(0, 2)) % 4 || 4;
			r.hall ||= "NA";
			return r;
		});

	console.log(data);

	const validation = v.safeParse(
		v.object({
			college: v.string(),
			course: v.string(),
			branch: v.string(),
			name: v.string(),
			class: v.string(),
			year: v.number(),
			serial: v.pipe(v.string(), v.regex(/\d+/)),
			faculty: v.pipe(v.string(), v.maxLength(10)),
			enrollment: v.pipe(v.string(), v.maxLength(6)),
			hall: v.pipe(v.string(), v.maxLength(2)),
			subjects: v.array(
				v.object({
					code: v.string(),
					subject: v.string(),
					mode: v.string(),
					credits: v.number(),
				}),
			),
		}),
		data,
	);

	if (!validation.success) {
		return new Response(JSON.stringify(validation.issues), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}

	const validatedData = validation.output;

	console.log(validatedData);

	await Promise.all([
		$subjects.set(validatedData.subjects),
		$user.set(validatedData),
	]);

	return redirect("/home");
};
