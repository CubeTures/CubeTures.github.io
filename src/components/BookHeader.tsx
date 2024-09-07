import { BookProps } from "@/interfaces/homeInterfaces";
import BookCover from "./BookCover";

export default function BookHeader({ title, author, cover }: BookProps) {
	return (
		<div className="book-info-container">
			<div className="book-info">
				<BookCover
					title={title}
					image={cover}
				/>
			</div>
			<h1>{title}</h1>
			<h3>{author}</h3>
		</div>
	);
}
