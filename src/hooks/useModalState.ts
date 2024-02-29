import useBoundStore from "~/store/useBoundStore.ts";

export const useModalState = (id: string) => {
    const modals = useBoundStore(state => state.modals);
    const setModal = useBoundStore(state => state.setModal);

    if (modals[id] === undefined) {
        setModal(id, false)
    }

    return modals[id]
}