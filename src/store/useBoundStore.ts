import { create } from 'zustand'
import {AuthSlice, createAuthSlice} from "~/store/slices/authSlice.ts";
import {createModalSlice, ModalSlice} from "~/store/slices/modalSlice.ts";
import {createWareSlice, WareSlice} from "~/pages/ware-page/warePageSlice.tsx";

const useBoundStore = create<AuthSlice & ModalSlice & WareSlice>()((...a) => ({
    ...createAuthSlice(...a),
    ...createModalSlice(...a),
    ...createWareSlice(...a)
}))

export default useBoundStore
