import { BookProps } from "@/interfaces/homeInterfaces";
import { DisplayTagList } from "@/interfaces/tagInterfaces";
import { getDisplayTagList } from "@/scripts/helper";

function Pill(label: string) {
	return (
		<p
			style={{
				border: "1px solid white",
				borderRadius: "12px",
				padding: "6px",
			}}>
			{label}
		</p>
	);
}

export default function BookTags({
	format,
	demographic,
	genres,
	tropes,
}: BookProps) {
	const tags: DisplayTagList = getDisplayTagList(
		format,
		demographic,
		genres,
		tropes
	);

	return (
		<div>
			{tags.map(({ label, items }) => (
				<div>
					<h3 style={{ marginBottom: "6px" }}>{label}</h3>
					<div
						style={{
							flexDirection: "row",
							flexWrap: "wrap",
							display: "flex",
							gap: "6px",
							marginBottom: "6px",
						}}>
						{items.map((tag) => Pill(tag))}
					</div>
				</div>
			))}
		</div>
	);
}
