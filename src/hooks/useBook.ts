import { BookProps } from "@/interfaces/homeInterfaces";
import { getBook } from "@/scripts/storage";
import { ReadonlyURLSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

type bookState = [BookProps, Dispatch<SetStateAction<BookProps>>];

export function useBook(params: ReadonlyURLSearchParams): bookState;
export function useBook(id: string): bookState;
export default function useBook(
	value: string | ReadonlyURLSearchParams
): bookState {
	const id = getId(value);
	return useState<BookProps>(getBook(id));
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
