import { create } from 'zustand'
import {AuthSlice, createAuthSlice} from "~/store/slices/authSlice.ts";
import {createModalSlice, ModalSlice} from "~/store/slices/modalSlice.ts";

const useBoundStore = create<AuthSlice & ModalSlice>()((...a) => ({
    ...createAuthSlice(...a),
    ...createModalSlice(...a)
}))

export default useBoundStore
