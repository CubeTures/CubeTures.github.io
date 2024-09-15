import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/global.sass";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Tag Info",
	description: "Tag Info",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <Suspense>{children}</Suspense>;
}
