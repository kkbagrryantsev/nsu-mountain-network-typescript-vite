import {type StateCreator} from 'zustand'
import axios from 'axios'
import {apiApproveBookingRequest} from "~/api/models/ApiCalls.ts";

export interface WareSlice {
    approveItemBookingRequest: (useId: string, description: string) => Promise<number>
}

export const createWareSlice: StateCreator<WareSlice> = _set => ({
    approveItemBookingRequest: async (useId: string, description: string) => {
        try {
            const requestBody = {use_ids: [
                    {use_id: useId, description}
                ]}
            const response = await apiApproveBookingRequest(requestBody)

            return response.status
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response !== undefined) {
                    console.log(error.response.status)
                    return error.response.status
                }
            }
            console.log(error)
            return -1
        }
    }
})
