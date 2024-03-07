import {UseRecordState} from "~/enums/UseRecordState.ts";

export interface UseRecord {
    id: string
    isConfirmed: UseRecordState
    itemId: string
    quantity: number
    userId: string
    warehousemanId: string
    description: string
    startDate: Date
    endDate: Date
}