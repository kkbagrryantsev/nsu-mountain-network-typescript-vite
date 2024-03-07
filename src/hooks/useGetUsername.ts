import {useEffect, useState} from "react";
import useBoundStore from "~/store/useBoundStore.ts";
import {WithLoader} from "~/utils/WithLoader.ts";
import {LoadingState} from "~/enums/LoadingState.ts";

export const useGetUsername = (userId: string): WithLoader<any> => {
    const getUser = useBoundStore(state => state.getUser)
    const [usernameLoader, setUsernameLoader] = useState<WithLoader<any>>({loading: LoadingState.LOADING})

    useEffect(() => {
        getUser(userId).then(res => {
            setUsernameLoader({
                loading: LoadingState.LOADED,
                data: res.name
            });
        }).catch(err => setUsernameLoader({loading: LoadingState.ERROR, statusCode: err.status}))
    }, [getUser]);

    return usernameLoader
}