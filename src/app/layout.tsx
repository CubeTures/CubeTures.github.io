import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/global.sass";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Find a Book",
	description: "Find a Book to Read",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
