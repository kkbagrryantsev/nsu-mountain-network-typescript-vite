import axios from "axios";
import {getAccessToken} from "../Cookie.ts";

// AUTHORIZATION
export const apiSignIn = (data: unknown) => axios.post("/api/auth/login", data, {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAccessToken()}`,
    }
});

export const apiRefreshAccessToken = () =>
    axios.get("/api/auth/refresh", {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAccessToken()}`,
        }
    });

export const apiCheckAuthentication = () => axios.get('/api/protected/fromAny', {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAccessToken()}`,
    }
})

export const apiSignUp = (data: {
    name: string,
    phone: string,
    email: string,
    login: string,
    password: string
}) => axios.post(`/api/auth/signup`, data, {
    headers: {
        'Content-Type': 'application/json'
    }
})

// export const apiResetPassword = (token) =>
//     axios.post(`/api/auth/reset_password/${token}`, getJSONHeader());
//
// export const apiRequestPasswordReset = (email) =>
//     axios.post("/api/auth/reset_password_request", email, getJSONHeader());
//
// export const apiSignUp = (data) =>
//     axios.post("/api/auth/signup", data, getJSONHeader());
//
// export const apiConfirmSignUp = (token) =>
//     axios.post(`/api/auth/signup/confirm/${token}`, getJSONHeader());
// AUTHORIZATION

// WAREHOUSEMAN OPTIONS
// export const apiApproveUserSignUp = (signUpId) =>
//     axios.post(`/api/auth/approve_user/${signUpId}`, getAccessTokenHeader());
// export const apiRejectUserSignUp = (signUpId) =>
//     axios.post(`/api/auth/reject_user/${signUpId}`, getAccessTokenHeader());
// WAREHOUSEMAN OPTIONS

// USER DATA
// export const apiGetMyProfile = () =>
//     axios.get("/api/auth/my_profile/", getAccessTokenHeader());
//
// export const apiGetMyRequestsByType = (type) =>
//     axios.get(`/api/auth/my_profile/requests/${type}`, getAccessTokenHeader());
//
// export const apiConfirmEmailChange = (token) =>
//     axios.post(
//         `/api/auth/my_profile/settings/confirm/${token}`,
//         getAccessTokenHeader()
//     );
//
// export const apiChangeEmail = (email) =>
//     axios.post("/api/auth/my_profile/settings/new_email", email);
//
// export const apiChangeLogin = (email) =>
//     axios.post("/api/auth/my_profile/settings/new_login", email);
//
// export const apiChangePassword = (email) =>
//     axios.post("/api/auth/my_profile/settings/new_password", email);
//
// export const apiChangePhone = (email) =>
//     axios.post("/api/auth/my_profile/settings/new_phone", email);
//
// export const apiChangeUsername = (email) =>
//     axios.post("/api/auth/my_profile/settings/new_username", email);
// USER DATA
