"use client";

import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { HTMLAttributes, ReactNode } from "react";

// section with locale
// changes dir according to locale

interface SectionWithLocaleProps extends HTMLAttributes<HTMLDivElement> {
	sectionName: string;
	children: ReactNode;
}
function SectionWithLocale({
	children,
	sectionName,
	...props
}: SectionWithLocaleProps) {
	const locale = useLocale();
	const isRTL = locale === "he" || locale === "ar";
	return (
		<section
			{...props}
			className={cn(`${sectionName} w-full py-24`, props.className)}
			dir={isRTL ? "rtl" : "ltr"}>
			<div className="container mx-auto">
				<p className="text-center text-5xl w-full p-24 uppercase text-violet-700">
					section with locale: <span className="font-bold">{locale}</span>
				</p>
			</div>
		
			{children}
		</section>
	);
}

export default SectionWithLocale;
