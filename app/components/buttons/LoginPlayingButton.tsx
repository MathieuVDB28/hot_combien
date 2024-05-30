'use client';

import {signIn} from "next-auth/react";

export const LoginPlayingButton = () => {
    return (
        <button
            onClick={async () => {
                await signIn()
            }}
            className="bg-[hsl(var(--foreground))] text-[hsl(var(--background))] rounded-3xl border border-[hsl(var(--foreground))] py-3 px-6 text-center align-middle">
            Se connecter pour jouer en ligne
        </button>
    )
}