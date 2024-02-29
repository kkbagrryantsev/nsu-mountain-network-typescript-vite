import useBoundStore from "~/store/useBoundStore"
import {LoadingState} from "~/enums/LoadingState.ts";

export const useAuthenticationStatus = () => {
    const authenticationStatus = useBoundStore(state => state.isAuthenticated)

    if (authenticationStatus.loading !== LoadingState.LOADED) {
        return false;
    }

    if (authenticationStatus.statusCode !== 200) {
        return false;
    }

    return authenticationStatus.data === true;
}
