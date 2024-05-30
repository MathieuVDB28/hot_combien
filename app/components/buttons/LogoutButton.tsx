'use client';

import React from "react";
import {signOut} from "next-auth/react";

export const LogoutButton = () => {
    return (
        <button
            onClick={async () => {
                await signOut()
            }}
            className="flex select-none rounded-lg border border-[hsl(var(--foreground))] py-3 px-6 text-center align-middle font-sans text-sm font-bold uppercase text-[hsl(var(--foreground))] transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
            <span>Se déconnecter</span>
        </button>
    )
}