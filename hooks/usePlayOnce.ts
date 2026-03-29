// hooks/usePlayOnce.ts
"use client";

import { useEffect, useState } from "react";

export function usePlayOnce(key: string, enabled = true) {
    const [shouldPlay, setShouldPlay] = useState(false);
    const [hasChecked, setHasChecked] = useState(false);

    useEffect(() => {
        if (!enabled || typeof window === "undefined") {
            setHasChecked(true);
            return;
        }
        const hasPlayed = sessionStorage.getItem(key);
        if (!hasPlayed) {
            setShouldPlay(true);
            sessionStorage.setItem(key, "true");
        }
        setHasChecked(true);
    }, [key, enabled]);

    return { shouldPlay, hasChecked };
}