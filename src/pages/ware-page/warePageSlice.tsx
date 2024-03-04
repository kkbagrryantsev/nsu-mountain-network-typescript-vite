import {type StateCreator} from 'zustand'
import {LoadingState} from '~/enums/LoadingState.ts'
import axios from 'axios'
import {WithLoader} from "~/utils/WithLoader.ts";
import {Item} from "~/model/Item.ts";
import {apiGetItems} from "~/api/models/ApiCalls.ts";

export interface WareSlice {
    items: WithLoader<Item[]>

    getItems: (page: number) => Promise<void>
}

export const createWareSlice: StateCreator<WareSlice> = set => ({
    items: {loading: LoadingState.NOT_STARTED},
    getItems: async (page: number) => {
        try {
            const response = await apiGetItems(page)

            const statusCode = response.status

            if (statusCode === 200) {
                const {items}: {items: any[]} = response.data
                const parsedItems = items.map(({
                                                   item_id: id,
                                                   item_name: name,
                                                   item_cost: cost,
                                                   item_weight: weight,
                                                   item_description: description,
                                                   category_id: categoryId,
                                                   item_quantity_current: availableQuantity,
                                                   item_quantity_max: totalQuantity
                                               }): Item => ({
                    id,
                    categoryId,
                    weight,
                    cost,
                    description,
                    name,
                    availableQuantity,
                    totalQuantity
                }))
                set(_state => ({items: {data: parsedItems, loading: LoadingState.LOADED, statusCode}}))
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response !== undefined) {
                    const statusCode = error.response.status
                    set(_state => ({items: {loading: LoadingState.ERROR, statusCode}}))
                }
            }
            //TODO Check it doesn't affect the usability
            throw new Error("Unexpected error")
        }
    }
})
