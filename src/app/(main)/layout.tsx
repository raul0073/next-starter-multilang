import { getLocale, getMessages } from "next-intl/server";
import { Assistant, Rajdhani } from "next/font/google";
import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import "./globals.scss";
import LocaleSwitcher from "../components/root/language/LocaleSwitcher";

// Define fonts
// english fonts
const rajdhani = Rajdhani({
	variable: "--font-rajdhani",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	display: "swap",
});
// hebrew fonts
const assistant = Assistant({
	variable: "--font-assistant",
	subsets: ["hebrew"],
	weight: ["200", "300", "400", "500", "600", "700", "800"],
	display: "swap",
});

export default async function LocaleLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// get default locale
	let locale = await getLocale();

	// get cookie locale if set
	const getRelevantLocale = async () => {
		const cookie = await cookies();
		const storedLocale = cookie.get("NEXT_LOCALE")?.value;

		if (storedLocale) {
			locale = storedLocale;
			return storedLocale;
		}
		return locale;
	};
	
	getRelevantLocale();
 
	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages();
	// check if locale is right-to-left
	const isRtl = locale === "he" || locale === "ar";
	// adjust font accordingly
	const fontClass = isRtl ? assistant.variable : rajdhani.variable;

	return (
		<html lang={locale} dir={isRtl ? "rtl" : "ltr"}>
			<body
				className={`${fontClass} ${
					isRtl ? "font-assistant" : "font-rajdhani"
				} antialiased bg-stone-900`}>
				<NextIntlClientProvider messages={messages}>
				<div className="w-full flex justify-center mt-12">
				<LocaleSwitcher currentLocale={locale} />
				</div>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
