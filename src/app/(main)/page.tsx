import { useTranslations } from "next-intl";
import SectionWithLocale from "../components/root/SectionWithLocale";

export default function Home() {
	const content = useTranslations("Root");
	return (
		<SectionWithLocale sectionName="hero">
			<h1 className="flex justify-center items-center text-5xl leading-3 font-bold text-white/90">
				{content("starter")}
			</h1>
		</SectionWithLocale>
	);
}
