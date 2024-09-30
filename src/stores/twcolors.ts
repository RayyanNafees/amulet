export type TWColor =
	| "slate"
	| "zinc"
	| "gray"
	| "neutral"
	| "stone"
	| "red"
	| "green"
	| "emerald"
	| "lime"
	| "orange"
	| "yellow"
	| "fuchsia"
	| "sky"
	| "blue"
	| "teal"
	| "amber"
	| "cyan"
	| "indigo"
	| "violet"
	| "purple"
	| "pink"
	| "rose";

export const colors: TWColor[] = [
	"slate",
	"zinc",
	"gray",
	"neutral",
	"stone",
	"red",
	"green",
	"emerald",
	"lime",
	"orange",
	"yellow",
	"fuchsia",
	"sky",
	"blue",
	"teal",
	"amber",
	"cyan",
	"indigo",
	"violet",
	"purple",
	"pink",
	"rose",
];

export const classes: Record<TWColor, `border-${TWColor}-400 text-${TWColor}-500`> =
	{
		slate: "border-slate-400 text-slate-500",
		zinc: "border-zinc-400 text-zinc-500",
		gray: "border-gray-400 text-gray-500",
		neutral: "border-neutral-400 text-neutral-500",
		stone: "border-stone-400 text-stone-500",
		red: "border-red-400 text-red-500",
		green: "border-green-400 text-green-500",
		emerald: "border-emerald-400 text-emerald-500",
		lime: "border-lime-400 text-lime-500",
		orange: "border-orange-400 text-orange-500",
		yellow: "border-yellow-400 text-yellow-500",
		fuchsia: "border-fuchsia-400 text-fuchsia-500",
		sky: "border-sky-400 text-sky-500",
		blue: "border-blue-400 text-blue-500",
		teal: "border-teal-400 text-teal-500",
		amber: "border-amber-400 text-amber-500",
		cyan: "border-cyan-400 text-cyan-500",
		indigo: "border-indigo-400 text-indigo-500",
		violet: "border-violet-400 text-violet-500",
		purple: "border-purple-400 text-purple-500",
		pink: "border-pink-400 text-pink-500",
		rose: "border-rose-400 text-rose-500",
	};
