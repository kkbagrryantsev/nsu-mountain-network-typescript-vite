import { type StateCreator } from 'zustand'
import { LoadingState } from '~/enums/LoadingState.ts'
import axios from 'axios'
import {WithLoader} from "~/utils/WithLoader.ts";
import {apiCheckAuthentication, apiSignIn} from "~/api/auth/ApiCalls.ts";

export interface AuthSlice {
    isAuthenticated: WithLoader<boolean>

    checkAuthentication: () => Promise<void>

    signIn: (credentials: never) => Promise<void>
}

export const createAuthSlice: StateCreator<AuthSlice> = set => ({
    isAuthenticated: { data: true, loading: LoadingState.LOADING },

    signIn: async (credentials: string) => {
        try {
            const response = await apiSignIn(credentials)

            const statusCode = response.status

            if (statusCode === 200) {
                set(_state => ({ isAuthenticated: { data: true, loading: LoadingState.LOADED, statusCode } }))
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // TODO Remove debug
                set(_state => ({
                    isAuthenticated: {
                        data: true,
                        loading: LoadingState.LOADED,
                        statusCode: 200
                    }
                }))

                if (error.response !== undefined) {
                    const statusCode = error.response.status
                    set(_state => ({ isAuthenticated: { data: false, loading: LoadingState.ERROR, statusCode } }))
                }
            }
        }
    },

    checkAuthentication: async () => {
        try {
            set(_state => ({ isAuthenticated: { data: true, loading: LoadingState.LOADING } }))

            const response = await apiCheckAuthentication()

            const data = response.data
            const statusCode = response.status

            // FIXME is authenticated has another check logic
            set(_state => ({ isAuthenticated: { data, loading: LoadingState.LOADED, statusCode } }))
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // TODO Remove debug
                set(_state => ({
                    isAuthenticated: {
                        data: true,
                        loading: LoadingState.LOADED,
                        statusCode: 200
                    }
                }))

                if (error.response !== undefined) {
                    const statusCode = error.response.status
                    set(_state => ({ isAuthenticated: { data: true, loading: LoadingState.ERROR, statusCode } }))
                }
            }
        }
    }
})
