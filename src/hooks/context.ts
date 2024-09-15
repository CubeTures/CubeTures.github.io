import { BookProps } from "@/interfaces/homeInterfaces";
import { createContext, useContext } from "react";

export const BookInfoContext = createContext<BookProps | undefined>(undefined);
export function useBookInfoContext() {
	const context = useContext(BookInfoContext);
	if (context == undefined) {
		throw new Error("Book Info Context Undefined");
	}

	return context;
}
