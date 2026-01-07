import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";



export async function proxy(req: NextRequest) {
  const token = await getSession();
  // Se não tem token → redireciona para login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    return NextResponse.next();
  } catch (err) {
    // Token expirado ou inválido
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Definir quais rotas o middleware protege
export const config = {
  matcher: ["/home", "/admin/:path*", "/meus-dados","/sac/:path*","/orcamentos/:path*","/projeto/:path*","/financeiro/:path*"],
};
