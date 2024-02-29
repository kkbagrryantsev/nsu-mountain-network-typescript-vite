import {HttpStatusCode} from "axios";
import {LoadingState} from "~/enums/LoadingState.ts";

export interface WithLoader<T> {
    data?: T | undefined | null
    loading: LoadingState
    statusCode?: HttpStatusCode | number
}