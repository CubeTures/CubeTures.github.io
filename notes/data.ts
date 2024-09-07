import { Tag } from "@/interfaces/tagInterfaces";

interface Book {
	title: string;
	authors: string[];
	illustrators: string[];
	translators: string[];
	publisher: string;
	publication_date: Date;
	edition: string;
	language: string;
	isbn: number;

	format: Tag;
	demographic: Tag;
	genres: Tag[];
	tropes: Tag[];

	cover: string; // an image
	summary: string;
	reviews: string; // will become another interface
}
