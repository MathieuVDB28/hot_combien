'use client';

import React from "react";
import {signIn} from "next-auth/react";

export const LoginButton = () => {
    return (
        <button
            onClick={async () => {
                await signIn()
            }}
            className="flex select-none rounded-lg border border-[hsl(var(--foreground))] py-3 px-6 text-center align-middle font-sans text-sm font-bold uppercase text-[hsl(var(--foreground))] transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
            <span>Se connecter</span>
        </button>
    )
}