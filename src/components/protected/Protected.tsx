import {useAuthenticationStatus} from "~/hooks/useAuthenticationStatus.ts";
import {Role} from "~/enums/Role.ts";
import React from "react";

interface ProtectedProps {
    isAuthenticated?: boolean,
    hasRole?: Role,
    children: React.ReactNode
}

export const Protected = (props: ProtectedProps) => {
    const {isAuthenticated, children} = props
    const authenticationStatus = useAuthenticationStatus()

    let flag = true;
    if (isAuthenticated !== undefined) {
        isAuthenticated === authenticationStatus ? flag = true : flag = false;
    }

    return flag ? children : null
}