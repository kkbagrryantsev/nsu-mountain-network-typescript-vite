import {ModalProvider} from "~/components/modal/ModalProvider.tsx";
import {Routes} from "~/Routes.tsx";

export const App = () => {
    return <>
        <Routes></Routes>
        <ModalProvider/>
    </>
}