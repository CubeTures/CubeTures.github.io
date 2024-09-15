import { BookProps } from "@/interfaces/homeInterfaces";
import books from "@/data/books";
import tags from "@/data/tags";
import { TagSection } from "@/interfaces/tagInterfaces";

export function getAllBooks(): Record<string, BookProps> {
	return books;
}

export function getBook(id: string): BookProps {
	return books[id];
}

export function getTag(section: TagSection, name: string) {
	return tags[section][name];
}
