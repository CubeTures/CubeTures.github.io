"use client";

import { useSearchParams } from "next/navigation";
import useBook from "@/hooks/useBook";
import "@/styles/home.sass";
import BookTags from "@/components/BookTags";
import BookHeader from "@/components/BookHeader";

export default function Books() {
	const params = useSearchParams();
	const [book, setBook] = useBook(params);

	return (
		<main>
			<BookHeader {...book} />
			<BookTags {...book} />
		</main>
	);
}
