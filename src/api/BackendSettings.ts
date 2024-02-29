import axios from "axios";
import {apiRefreshAccessToken} from "~/api/auth/ApiCalls";

export function initAxios() {
    axios.defaults.baseURL = "http://localhost:5000";
    // axios.defaults.baseURL = "https://nmm-nocarend.amvera.io";
}

//FIXME There is no use refreshing access token if there is no refresh token
axios.interceptors.response.use(
    anyResponse => {
        return anyResponse;
    },
    async anyError => {
        const originalConfig = anyError.config;

        //FIXME
        const status = anyError.response ? anyError?.response?.status : null;

        if (
            originalConfig.url !== '/api/auth/login' &&
            originalConfig.url !== '/api/auth/refresh'
        ) {
            if (status === 401 && originalConfig._retry !== true) {
                originalConfig._retry = true;
                try {
                    const refreshCallStatus = await apiRefreshAccessToken();

                    if (refreshCallStatus.status === 200) {
                        return axios(originalConfig);
                    }
                } catch (refreshError) {
                    return Promise.reject(refreshError);
                }
            }
        }

        return Promise.reject(anyError);
    }
);

// axios.interceptors.request.use(
//     function (request) {
//         if (request.headers.restrictAuthConfirm !== "true") {
//             apiCheckUserAuthenticationStatus().catch((ignore) => {
//                 deleteAccessToken();
//                 deleteUserRoles();
//                 window.location.href = window.location.origin;
//             });
//         }
//         return request;
//     },
//     function (error) {
//         return Promise.reject(error);
//     }
// );
