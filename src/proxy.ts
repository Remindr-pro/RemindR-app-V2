import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  // Routes protégées (private) - toutes les routes sous /dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      // Rediriger vers la page de connexion si non authentifié
      const loginUrl = new URL("/connexion", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Si l'utilisateur est connecté et essaie d'accéder à la page de connexion, rediriger vers le dashboard
  if (pathname === "/connexion" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/connexion"],
};
