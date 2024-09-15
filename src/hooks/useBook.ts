import { BookProps } from "@/interfaces/homeInterfaces";
import { getBook } from "@/scripts/storage";
import { ReadonlyURLSearchParams } from "next/navigation";

export function useBook(params: ReadonlyURLSearchParams): BookProps;
export function useBook(id: string): BookProps;
export default function useBook(
	value: string | ReadonlyURLSearchParams
): BookProps {
	const id = getId(value);
	return getBook(id);
}

function getId(value: string | ReadonlyURLSearchParams): string {
	if (typeof value === "string") {
		return value;
	} else {
		const id = value.get("id");

		if (!id) {
			throw new Error("ID not defined");
		}

		return id;
	}
}
