import { useBookInfoContext } from "@/hooks/context";
import { DisplayTagList } from "@/interfaces/tagInterfaces";
import { getDisplayTagList } from "@/scripts/helper";
import Tag from "./Tag";

export default function BookTags() {
	const context = useBookInfoContext();
	const tags: DisplayTagList = getDisplayTagList(context);

	return (
		<div>
			{tags.map(({ label, items }, index) => (
				<div key={index}>
					<h3 className="book-tag-header">{label}</h3>
					<div className="book-tag-container">
						{items.map((tag, index) => (
							<Tag
								section={label}
								name={tag}
							/>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
