import React, {useRef} from "react";
import {useClickAway} from "react-use";
import useBoundStore from "~/store/useBoundStore.ts";
import "./styles/Modal.scss"
import {IoCloseOutline} from "react-icons/io5";
import ReactDOM from "react-dom";

interface ModalProps {
    id: string
    children: React.ReactNode
}

export const Modal = (props: ModalProps) => {
    const {id, children} = props
    const modalRef = useRef(null)
    const isActive = useBoundStore(state => state.modals.authModal)

    const closeModal = useBoundStore(state => state.closeModal)
    useClickAway(modalRef, () => {
        closeModal(id);
    });

    if (!isActive) {
        return null;
    }

    return ReactDOM.createPortal(
        <div ref={modalRef} className={"modalBox"}>
            {children}
            <button>
                <IoCloseOutline/>
            </button>
        </div>,
        document.getElementById('modalProvider') || document.body
    )
}