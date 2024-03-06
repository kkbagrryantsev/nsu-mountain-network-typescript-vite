import {type StateCreator} from 'zustand'
import {LoadingState} from '~/enums/LoadingState.ts'
import axios from 'axios'
import {Item} from "~/model/Item.ts";
import {apiGetItem} from "~/api/models/ApiCalls.ts";
import {WithLoader} from "~/utils/WithLoader.ts";
import {UseRecord} from "~/model/UseRecord.ts";

export interface ItemModalSlice {
    item: WithLoader<Item>

    useData: WithLoader<any>

    getItem: (id: string) => Promise<void>
}

export const createItemModalSlice: StateCreator<ItemModalSlice> = set => ({
    item: {loading: LoadingState.LOADING},
    useData: {data: [], loading: LoadingState.LOADING},
    getItem: async (id: string) => {
        try {
            const response = await apiGetItem(id)

            const statusCode = response.status

            if (statusCode === 200) {
                console.log(response.data)
                const {item: rawItem, item_data: rawUseData}: {item: any, item_data: any[]} = response.data
                const {
                    item_id: id,
                    item_name: name,
                    item_cost: cost,
                    item_weight: weight,
                    item_description: description,
                    category_id: categoryId,
                    item_quantity_current: availableQuantity,
                    item_quantity_max: totalQuantity
                } = rawItem
                const item = {
                    id,
                    name,
                    cost,
                    weight,
                    description,
                    categoryId,
                    availableQuantity,
                    totalQuantity
                }
                const useData = rawUseData.map(({
                                                    is_confirm: isConfirmed,
                                                    use_id: id,
                                                    user_id: userId,
                                                    warehouseman_id: warehousemanId,
                                                    item_id: itemId,
                                                    item_quantity: quantity,
                                                    use_description: description,
                                                    use_datetime: startDate,
                                                    until_datetime: endDate
                                                }): UseRecord => ({
                    isConfirmed,
                    description,
                    itemId,
                    quantity,
                    userId,
                    warehousemanId,
                    endDate: new Date(endDate),
                    startDate: new Date(startDate),
                    id
                }))
                set(_state => ({
                    ..._state,
                    item: {data: item, loading: LoadingState.LOADED, statusCode},
                    useData: {data: useData, loading: LoadingState.LOADED, statusCode}
                }))
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response !== undefined) {
                    const statusCode = error.response.status
                    set(_state => ({
                        ..._state,
                        item: {loading: LoadingState.ERROR, statusCode}
                    }))
                }
            }
            set(_state => ({
                ..._state,
                item: {
                    loading: LoadingState.ERROR,
                    statusCode: 404
                }
            }))
        }
    }
})
