import { Tag } from "./tagInterfaces";

export interface BookProps {
	id: string;
	title: string;
	author: string;
	cover: string;
	summary: string;
	format: Tag;
	demographic: Tag;
	genres: Tag[];
	tropes: Tag[];
}

export interface BookCoverProps {
	title: string;
	image: string;
}
