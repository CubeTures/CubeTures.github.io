import { BookProps } from "@/interfaces/homeInterfaces";
import "@/styles/home.sass";
import BookCover from "./BookCover";
import { useRouter } from "next/navigation";
import { format } from "url";

export default function Book({ title, author, cover, id }: BookProps) {
	const router = useRouter();

	function onClick() {
		const url = format({ pathname: "/books", query: { id } });
		router.push(url);
	}

	return (
		<div
			className="book"
			onClick={onClick}>
			<BookCover
				title={title}
				image={cover}
			/>
			<div className="book-title-gradient">
				<p className="book-title">{title}</p>
			</div>
		</div>
	);
}
