import { BookProps } from "@/interfaces/homeInterfaces";
import "@/styles/home.sass";
import Link from "next/link";

export default function Book({ title, author, cover, id }: BookProps) {
	return (
		<Link
			className="book"
			href={`/books?id=${id}`}>
			<img
				className="book-cover"
				src={cover}
				alt={title}
			/>
			<div className="book-title-gradient">
				<p className="book-title">{title}</p>
			</div>
		</Link>
	);
}
