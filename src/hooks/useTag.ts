import { TagInfo, TagSection, isTagSection } from "@/interfaces/tagInterfaces";
import { getTag } from "@/scripts/storage";
import { ReadonlyURLSearchParams } from "next/navigation";

export default function useTag(value: ReadonlyURLSearchParams): TagInfo {
	const { section, name } = getSectionAndName(value);
	return getTag(section as TagSection, name);
}

function getSectionAndName(value: ReadonlyURLSearchParams) {
	const section = value.get("section");
	const name = value.get("name");

	if (!section) {
		throw new Error("Section not defined");
	} else if (!isTagSection(section)) {
		throw new Error("Section is not a valid Tag Section");
	}
	if (!name) {
		throw new Error("Name not defined");
	}

	return { section, name };
}
