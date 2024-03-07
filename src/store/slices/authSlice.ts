import {type StateCreator} from 'zustand'
import {LoadingState} from '~/enums/LoadingState.ts'
import axios from 'axios'
import {WithLoader} from "~/utils/WithLoader.ts";
import {apiCheckAuthentication, apiSignIn, apiSignUp} from "~/api/auth/ApiCalls.ts";
import {saveAccessToken} from "~/api/Cookie.ts";

export interface AuthSlice {
    isAuthenticated: WithLoader<boolean>

    checkAuthentication: () => Promise<void>

    signIn: (credentials: any) => Promise<number>

    signUp: (credentials: any) => Promise<number>
}

export const createAuthSlice: StateCreator<AuthSlice> = set => ({
    isAuthenticated: { data: true, loading: LoadingState.LOADING },

    signIn: async (credentials: string) => {
        try {
            const response = await apiSignIn(credentials)

            const statusCode = response.status

            if (statusCode === 200) {
                const {access_token: accessToken} = response.data
                saveAccessToken(accessToken)
                set(_state => ({ isAuthenticated: { data: true, loading: LoadingState.LOADED, statusCode } }))
            }

            return statusCode
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response !== undefined) {
                    const statusCode = error.response.status
                    set(_state => ({ isAuthenticated: { data: false, loading: LoadingState.ERROR, statusCode } }))
                    return statusCode
                }
            }
            //TODO Check it doesn't affect the usability
            throw new Error("Unexpected error")
        }
    },

    checkAuthentication: async () => {
        try {
            set(_state => ({ isAuthenticated: { data: false, loading: LoadingState.LOADING } }))

            const response = await apiCheckAuthentication()

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
                    set(_state => ({ isAuthenticated: { data: true, loading: LoadingState.ERROR, statusCode } }))
                }
            }
        }
    },

    signUp: async (credentials: any) => {
        try {
            const response = await apiSignUp(credentials)

            return response.status
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response !== undefined) {
                    return error.response.status
                }
            }
            //TODO Check it doesn't affect the usability
            throw new Error("Unexpected error")
        }
    },
})
