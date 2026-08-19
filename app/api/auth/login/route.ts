import { NextResponse } from "next/server";

import { loginSchema } from "@/server/validations/auth";
import { loginUser } from "@/server/services/auth/login";
import { cookies } from "next/headers";
import { createAuthToken } from "@/server/lib/auth";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const result = loginSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                {
                    message: "Invalid input",
                    errors: result.error.flatten().fieldErrors,
                },
                { status: 400 },
            );
        }

        const user = await loginUser(result.data);

        const token = await createAuthToken(user.id);

        const cookieStore = await cookies();

        cookieStore.set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });

        return NextResponse.json(
            {
                message: "Login successful",
                user,
            },
            { status: 200 },
        );
    } catch (error) {
        if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 },
            );
        }

        console.error(error);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 },
        );
    }
}