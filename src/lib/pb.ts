import Pocketbase from "pocketbase";
import type { NotesRecord, NotesResponse } from "pocketbase-types";

const isUrl = (txt: string) => {
	try {
		new URL(txt);
		return true;
	} catch (e) {
		return !(e instanceof TypeError);
	}
};

export const pb = new Pocketbase(import.meta.env.POCKETBASE_BASE_URL || 'https://amulet.pockethost.io');
export const pdfile = (record: NotesResponse) =>
	`${import.meta.env.POCKETBASE_BASE_URL}/api/files/${record.collectionId}/${record.id}/${record.pdf}`;
