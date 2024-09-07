import { BookCoverProps } from "@/interfaces/homeInterfaces";
import Image from "next/image";

export default function BookCover({ title, image }: BookCoverProps) {
	return (
		<Image
			className="book-cover"
			src={image}
			alt={`${title} Cover Art`}
			fill
			placeholder="blur"
			blurDataURL={image}
		/>
	);
}
