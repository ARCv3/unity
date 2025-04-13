import { useEffect } from "react";
import { useAuthToken } from "./use-auth-token";


export function useOnceAuthenticated( hook: () => any, deps: any[], extraCond: boolean = true) {

    const { token } = useAuthToken();

    useEffect(() => {

        if (token && extraCond) {
            hook();
        }

    }, [...deps, token, hook])

}