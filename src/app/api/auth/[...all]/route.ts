// Route API Better Auth - désactivée pour l'instant
// Nous utilisons directement l'API Express pour l'authentification
// Cette route peut être utilisée pour une future intégration complète de Better Auth

import { NextResponse } from "next/server";

const NOT_IMPLEMENTED_RESPONSE = {
  error: "Better Auth n'est pas configuré",
};

export async function GET() {
  return NextResponse.json(NOT_IMPLEMENTED_RESPONSE, { status: 501 });
}

export async function POST() {
  return NextResponse.json(NOT_IMPLEMENTED_RESPONSE, { status: 501 });
}

export async function PUT() {
  return NextResponse.json(NOT_IMPLEMENTED_RESPONSE, { status: 501 });
}

export async function DELETE() {
  return NextResponse.json(NOT_IMPLEMENTED_RESPONSE, { status: 501 });
}
