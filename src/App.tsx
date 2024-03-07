import {ModalProvider} from "~/components/modal/ModalProvider.tsx";
import {Routes} from "~/Routes.tsx";
import useBoundStore from "~/store/useBoundStore.ts";
import {useEffect} from "react";
import {Bounce, ToastContainer} from "react-toastify";

export const App = () => {
    const checkAuthentication = useBoundStore(state => state.checkAuthentication)
    useEffect(() => {
        void checkAuthentication()
    }, [checkAuthentication])

    return <>
        <Routes/>
        <ModalProvider/>
        <ToastContainer
            position={"bottom-right"}
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme={"light"}
            transition={Bounce}
        />
    </>
}