const tagSection = ["Format", "Demographic", "Genre", "Tropes"];
export type TagSection = (typeof tagSection)[number];
export type TagSections = Record<TagSection, TagList>;

export type TagList = Record<Tag, TagInfo>;
export type Tag = string;
export interface TagInfo {
	description: string;
	seeAlso?: [string];
	examples?: [number]; // list of book ids for the most popular examples
}

export type DisplayTagList = { label: string; items: Tag[] }[];

export function isTagSection(section: unknown): section is TagSection {
	return typeof section == "string" && tagSection.includes(section);
}
