import {type StateCreator} from 'zustand'
import {apiGetUserById} from "~/api/models/ApiCalls.ts";
import {User} from "~/model/User.ts";

export interface UserSlice {
    getUser: (userId: string) => Promise<User>
}

export const createUserSlice: StateCreator<UserSlice> = _set => ({
    getUser: async (userId: string) => {
        return apiGetUserById(userId).then(response => {
            if (response.status === 200) {
                const {user: rawUser} = response.data
                const {
                    user_isactive: isConfirmed,
                    user_id: id,
                    user_email: email,
                    user_login: login,
                    user_money: balance,
                    user_roles: roles,
                    user_phone: phone,
                    user_name: name,
                    items: items
                } = rawUser
                const user: User = {isConfirmed, balance, email, items, login, name, phone, roles, id}
                return user
            }
            return Promise.reject(response.config)
        }, (response) => Promise.reject(response.config))
    }
})
