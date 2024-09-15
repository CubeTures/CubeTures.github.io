import { BookInfoDialOptions } from "@/interfaces/booksInterfaces";
import { useState } from "react";
import "@/styles/books.sass";
import BookSummary from "./BookSummary";
import BookReviews from "./BookReviews";
import BookData from "./BookData";

export default function BookInfoDial() {
	const [option, setOption] = useState<BookInfoDialOptions>("Summary");
	const options: BookInfoDialOptions[] = ["Summary", "Reviews", "Data"];

	function changeOption(option: BookInfoDialOptions) {
		setOption(option);
	}

	return (
		<div className="book-info-dial">
			<div className="book-dial-picker">
				{options.map((name) => (
					<h3
						key={name}
						className={`book-dial-button ${
							name === option ? "selected" : ""
						}`}
						onClick={() => changeOption(name)}>
						{name}
					</h3>
				))}
			</div>
			{option == "Summary" && <BookSummary />}
			{option == "Reviews" && <BookReviews />}
			{option == "Data" && <BookData />}
		</div>
	);
}
