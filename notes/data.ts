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

	format: Format;
	Demographic: Demographic;
	genres: Genre[];

	cover: string; // an image
	summary: string;
	reviews: string; // will become another interface
}

// genre vs theme vs trope

type Format = "Textbook" | "Novel" | "Comic" | "Manga";
type Demographic = "Youth" | "Young Adult" | "Adult";
type Genre = "Fantasy" | "Sci-Fi" | "Fiction" | "Non-Fiction"; // genres will have a tree structure (under fiction falls fantasy, etc.)
type Tropes = "Animals" | "Harem" | "Mecha" | "Magic";
