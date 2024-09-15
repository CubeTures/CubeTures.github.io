"use client";

import { useSearchParams } from "next/navigation";
import useBook from "@/hooks/useBook";
import "@/styles/home.sass";
import BookHeader from "@/components/BookHeader";
import { BookInfoContext } from "@/hooks/context";
import BookInfoDial from "@/components/BookInfoDial";

export default function Books() {
	const params = useSearchParams();
	const book = useBook(params);

	return (
		<main>
			<BookInfoContext.Provider value={book}>
				<BookHeader />
				<BookInfoDial />
			</BookInfoContext.Provider>
		</main>
	);
}
