import { useBookInfoContext } from "@/hooks/context";
import BookTags from "./BookTags";

export default function BookSummary() {
	const { summary } = useBookInfoContext();

	return (
		<div>
			<p className="book-summary">{summary}</p>
			<BookTags />
		</div>
	);
}
