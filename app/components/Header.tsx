import Image from "next/image";
import {LoginButton} from "@/app/components/buttons/LoginButton";
import {getServerSession} from "next-auth";
import {authConfig} from "@/pages/api/auth/[...nextauth]";
import {LogoutButton} from "@/app/components/buttons/LogoutButton";

export default async function Header() {
    const session = await getServerSession(authConfig);

    return (
        <div className="z-10 flex flex-row w-full items-center font-mono text-sm">
            <div className="flex flex-row gap-2 items-center justify-center -ml-6">
                <Image
                    src="/img/logo.png"
                    alt="Logo"
                    width={100}
                    height={100}
                />
                <span className="text-xl text-[hsl(var(--foreground))]">Hot Combien</span>
            </div>
            <div className="flex-1"></div>
            <div className="h-48 justify-center lg:h-auto">
                { session ? (
                    <LogoutButton />
                ) : (
                    <LoginButton />
                )}
            </div>
        </div>
    );
}