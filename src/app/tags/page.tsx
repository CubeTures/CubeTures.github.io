"use client";

import { useSearchParams } from "next/navigation";
import "@/styles/home.sass";
import useTag from "@/hooks/useTag";

export default function Books() {
	const params = useSearchParams();
	const tagInfo = useTag(params);

	return (
		<main>
			<p>Tag Information</p>
		</main>
	);
}
