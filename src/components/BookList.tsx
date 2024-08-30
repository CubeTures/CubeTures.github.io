import "@/styles/home.sass";
import Book from "./Book";
import { BookProps } from "@/interfaces/homeInterfaces";

const books: BookProps[] = [
	{
		id: "1",
		title: "Animal Farm",
		author: "George Orwell",
		cover: "/covers/AnimalFarm.jpg",
	},
	{
		id: "2",
		title: "Attack on Titan",
		author: "Hajime Isayama",
		cover: "/covers/AttackOnTitan.jpg",
	},
	{
		id: "3",
		title: "Fahrenheit 451",
		author: "Ray Bradbury",
		cover: "/covers/Fahrenheit451.jpg",
	},
	{
		id: "4",
		title: "Lord of the Flies",
		author: "William Golding",
		cover: "/covers/LordOfTheFlies.jpg",
	},
	{
		id: "5",
		title: "The Grapes of Wrath",
		author: "John Steinbeck",
		cover: "/covers/TheGrapesOfWrath.jpg",
	},
	{
		id: "6",
		title: "Tokyo Ghoul",
		author: "Sui Ishida",
		cover: "/covers/TokyoGhoul.jpg",
	},
	{
		id: "7",
		title: "The Very Hungry Caterpillar",
		author: "Eric Carle",
		cover: "/covers/TheVeryHungryCaterpillar.jpg",
	},
	{
		id: "8",
		title: "The Tall Book of Nursery Tales",
		author: "Aleksey & Olga Ivanov",
		cover: "/covers/TheTallBookOfNurseryTales.jpg",
	},
];

export default function BookList() {
	return (
		<section>
			<h1 className="margin-bottom">My Books</h1>
			<div className="book-list">
				{books
					.map((value) => ({ value, sort: Math.random() }))
					.sort((a, b) => a.sort - b.sort)
					.map(({ value: book }, index) => (
						<Book
							key={index}
							{...book}
						/>
					))}
			</div>
		</section>
	);
}
