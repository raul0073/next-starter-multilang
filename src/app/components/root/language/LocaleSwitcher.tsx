"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import LangIcon from "./LangIcon";
import { HandleLanguageChange } from "./service/LangSwitcherHandler";

const languages = [
	{ code: "en", label: "English" },
	{ code: "he", label: "עברית" },
	{ code: "es", label: "Español" },
	{ code: "ar", label: "العربية" },
];

export default function LocaleSwitcher({
	currentLocale,
}: {
	currentLocale: string;
}) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const changeLanguage = async (locale: string) => {
		await HandleLanguageChange(locale, currentLocale, router, startTransition);
	};
	return (
		<div className="text-base flex border px-3 py-2 text-white w-fit items-center">
			<LangIcon />
			<select
				dir={currentLocale}
				onChange={(e) => changeLanguage(e.target.value)}
				disabled={isPending}
				defaultValue={currentLocale}
				className="px-3 py-1 bg-transparent  rounded-none">
				{languages.map(({ code, label }) => (
					<option key={code} value={code} className="text-black">
						{label}
					</option>
				))}
			</select>
		</div>
	);
}
