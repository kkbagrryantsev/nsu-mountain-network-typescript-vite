import {ModalProvider} from "~/components/modal/ModalProvider.tsx";
import {Routes} from "~/Routes.tsx";
import useBoundStore from "~/store/useBoundStore.ts";
import {useEffect} from "react";

export const App = () => {
    const checkAuthentication = useBoundStore(state => state.checkAuthentication)
    useEffect(() => {
        void checkAuthentication()
    }, [checkAuthentication])

    return <>
        <Routes/>
        <ModalProvider/>
    </>
}