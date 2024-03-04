import {type StateCreator} from 'zustand'
import {LoadingState} from '~/enums/LoadingState.ts'
import axios from 'axios'
import {WithLoader} from "~/utils/WithLoader.ts";
import {Item} from "~/model/Item.ts";
import {apiGetItems} from "~/api/models/ApiCalls.ts";

export interface WareSlice {
    items: WithLoader<Item[]>

    page: number

    getItems: (page: number) => Promise<void>
}

export const createWareSlice: StateCreator<WareSlice> = set => ({
    items: {data: [], loading: LoadingState.LOADING},
    page: 1,
    getItems: async (page: number) => {
        try {
            const response = await apiGetItems(page)

            const statusCode = response.status

            if (statusCode === 200) {
                const {items}: { items: any[] } = response.data
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
                set(_state => ({
                    ..._state,
                    page: _state.page + 1,
                    items: {
                        data: _state.items.data?.concat(parsedItems),
                        loading: LoadingState.LOADED,
                        statusCode
                    }
                }))
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response !== undefined) {
                    const statusCode = error.response.status
                    set(_state => ({
                        ..._state,
                        items: {data: _state.items.data, loading: LoadingState.ERROR, statusCode}
                    }))
                }
            }
            set(_state => ({
                ..._state,
                items: {
                    data: _state.items.data,
                    loading: LoadingState.ERROR,
                    statusCode: 404
                }
            }))
        }
    }
})
