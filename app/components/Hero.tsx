import Image from "next/image";
import {getServerSession} from "next-auth";
import {authConfig} from "@/pages/api/auth/[...nextauth]";
import {LoginPlayingButton} from "@/app/components/buttons/LoginPlayingButton";
import {OfflineModeButton} from "@/app/components/buttons/OfflineModeButton";
import {OnlineModeButton} from "@/app/components/buttons/OnlineModeButton";

export default async function Hero() {
    const session = await getServerSession(authConfig);

    return (
        <div className="flex flex-col flex-grow mt-40">
            <div>
                <h1 className="text-5xl text-[hsl(var(--foreground))] md:text-6xl font-extrabold leading-tighter tracking-tighter">
                    Prêts à relever les défis Hot Combien avec vos amis ?
                </h1>
            </div>

            <div className="flex flex-row items-center justify-center gap-40 mt-20">
                {session ? (
                    <OnlineModeButton />
                ) : (
                    <LoginPlayingButton />
                    )
                }
                <OfflineModeButton />
            </div>

            <div className="mt-20 w-full">
                <div className="flex flex-col items-center justify-center">
                    <Image
                        src="/img/hero.svg"
                        alt="Hero image"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{width: '100%', height: '600px'}}
                    />
                </div>
            </div>
        </div>
    );
}
