import { TagProps } from "@/interfaces/booksInterfaces";
import "@/styles/books.sass";

export default function Tag({ section, name }: TagProps) {
	return (
		<p
			key={`${section}/${name}`}
			className="book-tag">
			{name}
		</p>
	);
}
