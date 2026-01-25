import { NextResponse } from "next/server";
import { DEMO_USERS } from "@/lib/demo-users";

type LoginBody = {
  username?: string;
  password?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LoginBody;

    const username = String(body?.username ?? "").trim();
    const password = String(body?.password ?? "");

    // ✅ Basic validation
    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required." },
        { status: 400 }
      );
    }

    // ✅ Find user (demo user list)
    const user = DEMO_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { message: "Invalid username or password." },
        { status: 401 }
      );
    }

    /**
     * ✅ Session payload (ERP-friendly)
     * Add more fields later:
     * - avatarUrl
     * - departmentId
     * - permissions array
     */
    const sessionPayload = {
      id: user.id,
      name: user.name,
      role: user.role,
      username: user.username,
      // avatarUrl: "/images/users/default.png", // ✅ future
    };

    const res = NextResponse.json(
      { message: "Login successful", user: sessionPayload },
      { status: 200 }
    );

    // ✅ Cookie expiry (ERP standard)
    // 1 day = 60 * 60 * 24
    res.cookies.set("dl_session", JSON.stringify(sessionPayload), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // ✅ 1 day session
    });

    return res;
  } catch {
    return NextResponse.json(
      { message: "Server error. Try again." },
      { status: 500 }
    );
  }
}
