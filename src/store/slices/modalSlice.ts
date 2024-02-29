import {StateCreator} from "zustand";

export interface ModalSlice {
    modals: Record<string, boolean>

    openModal: (id: string) => void

    closeModal: (id: string) => void

    setModal: (id: string, state: boolean) => void
}

export const createModalSlice: StateCreator<ModalSlice> = set => ({
    modals: {},
    openModal: (id: string) => {
        set(_state => ({modals: {..._state.modals, [id]: true}}))
    },
    closeModal: (id: string) => {
        set(_state => ({modals: {..._state.modals, [id]: false}}))
    },
    setModal: (id: string, state: boolean) => {
        set(_state => ({modals: {..._state.modals, [id]: state}}))
    }
});