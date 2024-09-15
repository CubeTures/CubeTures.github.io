import { useBookInfoContext } from "@/hooks/context";

export default function BookData() {
	const {illustrator, translator} = useBookInfoContext();

	return (
		<div className="book-data">
			<p>Illustrators: {illustrator}</p>
			<p>Translators: {translator}</p>
		</div>
	);
}
