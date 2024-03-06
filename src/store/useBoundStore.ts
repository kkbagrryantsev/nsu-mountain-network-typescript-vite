import { create } from 'zustand'
import {AuthSlice, createAuthSlice} from "~/store/slices/authSlice.ts";
import {createModalSlice, ModalSlice} from "~/store/slices/modalSlice.ts";
import {createWareSlice, WareSlice} from "~/pages/ware-page/warePageSlice.tsx";
import {createItemModalSlice, ItemModalSlice} from "~/pages/ware-page/components/itemModalSlice.tsx";

const useBoundStore = create<AuthSlice & ModalSlice & WareSlice & ItemModalSlice>()((...a) => ({
    ...createAuthSlice(...a),
    ...createModalSlice(...a),
    ...createWareSlice(...a),
    ...createItemModalSlice(...a),
    ...createWareSlice(...a)
}))

export default useBoundStore
