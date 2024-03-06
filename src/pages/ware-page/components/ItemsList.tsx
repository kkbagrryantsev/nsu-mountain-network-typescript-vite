import useBoundStore from "~/store/useBoundStore.ts";
import {Item} from "~/model/Item.ts";
import {ItemComponent} from "~/pages/ware-page/components/Item.tsx";
import {useEffect, useRef, useState} from "react";
import {LoadingState} from "~/enums/LoadingState.ts";
import {ItemModal} from "~/pages/ware-page/components/ItemModal.tsx";

export const ItemsList = () => {
    const itemsLoader = useBoundStore(state => state.items)
    const page = useBoundStore(state => state.page)
    const getItems = useBoundStore(state => state.getItems)

    const observerRef = useRef(null);

    useEffect(() => {
        if (observerRef.current === null) {
            return
        }
        if (itemsLoader.loading !== LoadingState.LOADED) {
            return
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    void getItems(page)
                }
            });
        });

        observer.observe(observerRef.current)

        return () => {
            observer.disconnect();
        };
    }, [itemsLoader]);

    const items = itemsLoader.data || []

    const [modalId, setModalId] = useState<string>()

    return <div className={"grid sm:grid-cols-1 md:grid-cols-2 gap-2"}>
        {items.map((item: Item) => <ItemComponent setModalId={setModalId} item={item} key={item.id}/>)}
        <ItemModal itemId={modalId}/>
        <div ref={observerRef}/>
    </div>
}