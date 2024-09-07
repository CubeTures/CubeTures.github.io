export interface Tags {
	format: TagList;
	demographic: TagList;
	genre: TagList;
	tropes: TagList;
}

export type TagList = Record<Tag, TagInfo>;
export type Tag = string;
export interface TagInfo {
	description: string;
	seeAlso?: [string];
	examples?: [number]; // list of book ids for the most popular examples
}

export type DisplayTagList = { label: string; items: Tag[] }[];
