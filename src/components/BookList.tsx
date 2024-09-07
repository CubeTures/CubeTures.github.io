import "@/styles/home.sass";
import Book from "./Book";
import { getAllBooks } from "@/scripts/storage";

export default function BookList() {
	const books = getAllBooks();

	return (
		<section>
			<h1 className="margin-bottom">My Books</h1>
			<div className="book-list">
				{Object.keys(books).map((id, index) => (
					<Book
						key={index}
						{...books[id]}
					/>
				))}
			</div>
		</section>
	);
}
