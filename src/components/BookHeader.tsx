import BookCover from "./BookCover";
import { useBookInfoContext } from "@/hooks/context";

export default function BookHeader() {
	const { title, author, cover } = useBookInfoContext();

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
