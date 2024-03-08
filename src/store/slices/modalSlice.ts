import {StateCreator} from "zustand";

export interface ModalSlice {
    modals: Record<string, any>

    openModal: (id: string, context?: object) => void

    closeModal: (id: string) => void
}

export const createModalSlice: StateCreator<ModalSlice> = set => ({
    modals: {},
    openModal: (id: string, context?: object) => {
        set(_state => ({modals: {..._state.modals, [id]: context || {}}}))
    },
    closeModal: (id: string) => {
        set(_state => {
            const {modals} = _state
            delete modals[id]
            return ({modals: {...modals}});
        })
    }
});