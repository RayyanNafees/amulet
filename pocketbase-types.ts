/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Classes = "classes",
	Classrooms = "classrooms",
	Notes = "notes",
	RegistrationCards = "registration_cards",
	Subjects = "subjects",
	Teachers = "teachers",
	Todos = "todos",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type ClassesRecord = {
	lab?: boolean
	room?: RecordIdString
	subject?: RecordIdString
	teacher?: RecordIdString[]
	time?: IsoDateString
}

export type ClassroomsRecord = {
	alt?: number
	lat?: number
	long?: number
	radius?: number
	room?: string
}

export type NotesRecord = {
	description?: string
	name?: string
	pdf?: string
}

export enum RegistrationCardsSemOptions {
	"odd" = "odd",
	"even" = "even",
}
export type RegistrationCardsRecord = {
	enroll?: string
	ip?: string
	raw?: string
	sem?: RegistrationCardsSemOptions
}

export type SubjectsRecord<Tsyllabus = unknown> = {
	avatar?: string
	code?: string
	name?: string
	short_name?: string
	syllabus?: null | Tsyllabus
}

export type TeachersRecord = {
	avatar?: string
	name?: string
	subject?: RecordIdString
	website?: string
}

export type TodosRecord = {
	completed?: boolean
	task?: string
}

export enum UsersClassOptions {
	"A2AE" = "A2AE",
	"A2MB" = "A2MB",
}
export type UsersRecord = {
	active?: boolean
	avatar?: string
	bio?: string
	class?: UsersClassOptions
	enrollement?: string
	faculty?: string
	name?: string
	serial_no?: number
}

// Response types include system fields and match responses from the PocketBase API
export type ClassesResponse<Texpand = unknown> = Required<ClassesRecord> & BaseSystemFields<Texpand>
export type ClassroomsResponse<Texpand = unknown> = Required<ClassroomsRecord> & BaseSystemFields<Texpand>
export type NotesResponse<Texpand = unknown> = Required<NotesRecord> & BaseSystemFields<Texpand>
export type RegistrationCardsResponse<Texpand = unknown> = Required<RegistrationCardsRecord> & BaseSystemFields<Texpand>
export type SubjectsResponse<Tsyllabus = unknown, Texpand = unknown> = Required<SubjectsRecord<Tsyllabus>> & BaseSystemFields<Texpand>
export type TeachersResponse<Texpand = unknown> = Required<TeachersRecord> & BaseSystemFields<Texpand>
export type TodosResponse<Texpand = unknown> = Required<TodosRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	classes: ClassesRecord
	classrooms: ClassroomsRecord
	notes: NotesRecord
	registration_cards: RegistrationCardsRecord
	subjects: SubjectsRecord
	teachers: TeachersRecord
	todos: TodosRecord
	users: UsersRecord
}

export type CollectionResponses = {
	classes: ClassesResponse
	classrooms: ClassroomsResponse
	notes: NotesResponse
	registration_cards: RegistrationCardsResponse
	subjects: SubjectsResponse
	teachers: TeachersResponse
	todos: TodosResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'classes'): RecordService<ClassesResponse>
	collection(idOrName: 'classrooms'): RecordService<ClassroomsResponse>
	collection(idOrName: 'notes'): RecordService<NotesResponse>
	collection(idOrName: 'registration_cards'): RecordService<RegistrationCardsResponse>
	collection(idOrName: 'subjects'): RecordService<SubjectsResponse>
	collection(idOrName: 'teachers'): RecordService<TeachersResponse>
	collection(idOrName: 'todos'): RecordService<TodosResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
