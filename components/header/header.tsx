import Link from "next/link";

import { getCurrentUser } from "@/server/services/auth/get-current-user";
import { LogoutButton } from "./logout-button";

export async function Header() {
    const user = await getCurrentUser();

    return (
        <header className="border-b">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                <Link href="/" className="text-xl font-bold">
                    Devora
                </Link>

                {user ? (
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">

                            <span className="text-sm font-medium">
                                {user.name}
                            </span>

                            <div className="flex size-9 items-center justify-center rounded-full bg-black text-sm font-medium text-white">
                                {user.name.charAt(0).toUpperCase()}
                            </div>


                        </div>

                        <LogoutButton />
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link href="/login">Login</Link>
                        <Link href="/register">Register</Link>
                    </div>
                )}
            </div>
        </header>
    );
}