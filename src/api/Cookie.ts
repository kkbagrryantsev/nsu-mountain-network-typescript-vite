import Cookies from "js-cookie";

const ACCESS_TOKEN = "ACCESS_TOKEN";

export const saveAccessToken = (token: string) => Cookies.set(ACCESS_TOKEN, token);
export const getAccessToken = () => Cookies.get(ACCESS_TOKEN);
export const deleteAccessToken = () => Cookies.remove(ACCESS_TOKEN);
