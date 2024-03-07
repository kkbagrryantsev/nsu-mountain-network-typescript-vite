import {type StateCreator} from 'zustand'
import {
    apiApproveBookingRequest,
    apiGiveItemByBookingRequest,
    apiRejectBookingRequest,
    apiReturnItem
} from "~/api/models/ApiCalls.ts";
import {toast} from "react-toastify";

export interface WareSlice {
    approveItemBookingRequest: (useId: string, description?: string) => void

    rejectItemBookingRequest: (useId: string, description?: string) => void

    giveItemByBookingRequest: (useId: string) => void

    returnItem: (useId: string, quantity: number) => void
}

export const createWareSlice: StateCreator<WareSlice> = _set => ({
    approveItemBookingRequest: (useId: string, description?: string) => {
        const requestBody = {use_ids: [
                {use_id: useId, description: description || ""}
            ]}
        void toast.promise(apiApproveBookingRequest(requestBody),
            {
                pending: "Ожидание ответа",
                error: "Не удалось выполнить",
                success: "Готово"
            })
    },
    rejectItemBookingRequest: (useId: string, description?: string) => {
        const requestBody = {use_ids: [
                {use_id: useId, description: description || ""}
            ]}
        void toast.promise(apiRejectBookingRequest(requestBody),
            {
                pending: "Ожидание ответа",
                error: "Не удалось выполнить",
                success: "Готово"
            })
    },
    giveItemByBookingRequest: (useId: string) => {
        const requestBody = {use_ids: [
                {use_id: useId}
            ]}
        void toast.promise(apiGiveItemByBookingRequest(requestBody),
            {
                pending: "Ожидание ответа",
                error: "Не удалось выполнить",
                success: "Готово"
            })
    },
    returnItem: (useId: string, quantity: number) => {
        const requestBody = {use_ids: [
                {use_id: useId, quantity: quantity}
            ]}
        void toast.promise(apiReturnItem(requestBody),
            {
                pending: "Ожидание ответа",
                error: "Не удалось выполнить",
                success: "Готово"
            })
    }
})
