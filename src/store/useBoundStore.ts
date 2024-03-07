import {create} from 'zustand'
import {AuthSlice, createAuthSlice} from "~/store/slices/authSlice.ts";
import {createModalSlice, ModalSlice} from "~/store/slices/modalSlice.ts";
import {createWarePageSlice, WarePageSlice} from "~/pages/ware-page/warePageSlice.tsx";
import {createItemModalSlice, ItemModalSlice} from "~/pages/ware-page/components/itemModalSlice.tsx";
import {createWareSlice, WareSlice} from "~/store/slices/wareSlice.ts";
import {createUserSlice, UserSlice} from "~/store/slices/userSlice.ts";

const useBoundStore = create<
    AuthSlice
    & ModalSlice
    & WarePageSlice
    & ItemModalSlice
    & WareSlice
    & UserSlice>()((...a) => ({
    ...createAuthSlice(...a),
    ...createModalSlice(...a),
    ...createWarePageSlice(...a),
    ...createItemModalSlice(...a),
    ...createWareSlice(...a),
    ...createUserSlice(...a)
}))

export default useBoundStore
