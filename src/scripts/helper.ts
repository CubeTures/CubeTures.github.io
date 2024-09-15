import { BookProps } from "@/interfaces/homeInterfaces";
import { Tag } from "@/interfaces/tagInterfaces";

export function getDisplayTagList({
	format,
	demographic,
	genres,
	tropes,
}: BookProps) {
	return [
		{
			label: "Format",
			items: [format],
		},
		{
			label: "Demographic",
			items: [demographic],
		},
		{
			label: "Genres",
			items: genres,
		},
		{
			label: "Tropes",
			items: tropes,
		},
	];
}
