import { Tag } from "@/interfaces/tagInterfaces";

export function getDisplayTagList(
	format: Tag,
	demographic: Tag,
	genres: Tag[],
	tropes: Tag[]
) {
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
