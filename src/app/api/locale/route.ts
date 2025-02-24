import { NextResponse } from "next/server";

/**
 * Handles POST requests to set the user's locale preference.
 *
 * @param req - The incoming request object containing the locale data in JSON format.
 * @returns A JSON response indicating success or an error if the locale is not provided.
 */
export async function POST(req: Request) {
  const { locale } = await req.json();
  if (!locale) {
    return NextResponse.json({ error: "Locale is required" }, { status: 400 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  return response;
}

