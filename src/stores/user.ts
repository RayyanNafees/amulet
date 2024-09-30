import { atom } from "nanostores";
export type User = {
	enrollment: string;
	faculty: string;
	name: string;
	college: string;
	course: string;
	branch: string;
	class: string;
	serial: string;
	hall: string;
	year: number;
};

export const $user = atom<Partial<User>>({});

export type Subject = {
	subject: string;
	code: string;
	mode: string;
	credits: number;
};

export const $subjects = atom<Subject[]>([]);

// export const $enroll = atom<string>("");
