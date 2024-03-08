import {Modal} from "~/components/modal/Modal.tsx";
import useBoundStore from "~/store/useBoundStore.ts";

export const ItemGiveModal = () => {
    const modalContext = useBoundStore(state => state.modals['itemGiveModal'])

    return <Modal id={"itemGiveModal"}>
        <div>{modalContext?.itemId}</div>
    </Modal>
}