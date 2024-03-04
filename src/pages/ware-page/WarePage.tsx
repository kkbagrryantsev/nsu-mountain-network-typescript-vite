import {Header} from "~/components/header/Header.tsx";
import {WarePageContent} from "~/pages/ware-page/WarePageContent.tsx";
import useBoundStore from "~/store/useBoundStore.ts";
import {useEffect} from "react";

export const WarePage = () => {
    const getItems = useBoundStore(state => state.getItems)
    useEffect(() => {
        void getItems(1)
    }, [getItems]);

    return <div>
        <Header/>
        <WarePageContent/>
    </div>
}