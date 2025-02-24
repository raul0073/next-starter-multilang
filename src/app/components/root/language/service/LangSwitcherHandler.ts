import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { TransitionStartFunction } from "react";


export const HandleLanguageChange = async (locale: string, currentLocale: string, router: AppRouterInstance, start: TransitionStartFunction) => {
    if (locale === currentLocale) return;

    await fetch("api/locale", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ locale }),
    });

    start(() => {
        router.refresh();
    });
};