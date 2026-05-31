import { NextRequest, NextResponse } from "next/server";

const PASSWORD = "20260530";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (password === PASSWORD) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("at_access", "granted", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return res;
  }
  return NextResponse.json({ ok: false }, { status: 401 });
}
