import { pb } from "@/lib/pb";
import type { ClassesRecord, ClassesResponse } from "pocketbase-types";
import { baseURL } from "./api";

const sat = "2024-08-31";
const fri = "2024-08-30";
const thu = "2024-08-29";
const wed = "2024-08-28";
const tue = "2024-08-27";
const mon = "2024-08-26";
const sun = "2024-08-25";

export const dayArr = [sun, mon, tue, wed, thu, fri, sat];

export const getTodayClasses = async () => {
	const day = new Date().getDay();
	const dayDate = dayArr[day];
	const data = await pb
		.collection<ClassesResponse & { items: ClassesRecord[] }>("classes")
		.getFullList({
			filter: `time~"${dayDate}"`,
			sort: "time",
			$autoCancel: false,
			expand: "subject",
		});
	// .catch((e) => console.error("Pocketbase error", e));
	return data;
};

export const fetchTodayClasses = async () => {
	const day = new Date().getDay();
	const dayDate = dayArr[day];
	const record = await fetch(
		`${baseURL}/api/collections/classes/records?time~"${dayDate}"&expand="subject"`,
	).then((r) => r.json());
	// .catch((e) => console.error("Pocketbase error", e));
	return record;
};
