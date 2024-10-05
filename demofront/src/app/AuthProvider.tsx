// AuthProvider.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); 
    const router = useRouter();
    

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            router.push("/"); 
        }
    }, [router]);

    if (isAuthenticated === null) {
        return <>Loading...</>; 
    }

    return <>{children}</>;
}
