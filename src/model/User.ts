import {UseRecord} from "~/model/UseRecord.ts";

export interface User {
    email: string,
    id: string,
    login: string,
    balance: number,
    name: string,
    roles: string,
    phone: string,
    isConfirmed: string,
    items: UseRecord[]
}