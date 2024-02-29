import axios from "axios";

// WAREHOUSEMAN OPTIONS, USERS OPERATIONS
// export const apiGetAllUsers = () =>
//   axios.get("/api/models/users", getAccessTokenHeader());
//
// export const apiCreateNewUser = (data) =>
//   axios.post("/api/models/users", data, getAccessTokenHeader());
//
// export const apiDeleteUser = (username) =>
//   axios.delete(`/api/models/users/${username}`, getAccessTokenHeader());
//
// export const apiGetUserData = (id) =>
//   axios.get(`/api/models/users/${id}`, getAccessTokenHeader());
//
// export const apiUpdateUserData = (username, data) =>
//   axios.patch(`/api/models/users/${username}`, data, getAccessTokenHeader());
// WAREHOUSEMAN OPTIONS, USERS OPERATIONS

// USER OPTIONS, ITEMS OPERATIONS
// export const apiGetCategoriesList = () =>
//   axios.get("/api/models/categories", getAccessTokenHeader());
//
// export const apiGetCategoryInfo = (id) =>
//   axios.get(`/api/models/categories/${id}`, getAccessTokenHeader());
//
// export const apiDeleteCategory = (id) =>
//   axios.delete(`/api/models/categories/${id}`, getAccessTokenHeader());
//
// export const apiProlongItemsInUse = (data) =>
//   axios.post("/api/models/item_in_use/prolong", data, getAccessTokenHeader());
//
// export const apiGetItemsInUseHistory = (type) => {
//   if (type === undefined) {
//     type = "all";
//   }
//   return axios.get(`/api/models/item_in_use/${type}`, getAccessTokenHeader());
// };
//
// export const apiGetAvailableItems = () =>
//     axios.get("/api/models/items?page=1", getAccessTokenHeader());
//
// export const apiBookItems = (data) =>
//   axios.post("/api/models/items/book", data, getAccessTokenHeader());
//
// export const apiUnbookItems = (data) =>
//   axios.post("/api/models/items/use/unbook", data, getAccessTokenHeader());
//
// export const apiGetItemData = (id) =>
//   axios.get(`/api/models/items/${id}`, getAccessTokenHeader());
//
// export const apiGetItemImage = (id) =>
//   axios.get(
//     `/api/models/items/${id}/image`,
//     getAccessTokenHeader({ contentType: "image/png" })
//   );
// USER OPTIONS, ITEMS OPERATIONS

// WAREHOUSEMAN OPTIONS, ITEMS OPERATIONS
// export const apiAddCategory = (data) =>
//   axios.post("/api/models/categories", data, getAccessTokenHeader());
//
// export const apiPatchCategory = (id, data) =>
//   axios.patch(`/api/models/categories/${id}`, data, getAccessTokenHeader());
//
// export const apiGetCategoryImage = (id) => {
//   return axios.get(`/api/models/categories/${id}/avatar`, {
//     headers: getAccessTokenHeader("image/png").headers,
//     responseType: "blob",
//   });
// };
//
// export const apiCreateItem = (data) =>
//   axios.post("/api/models/items", data, getAccessTokenHeader());
//
// export const apiApproveBookRequests = (data) =>
//   axios.post("/api/models/items/use/approve", data, getAccessTokenHeader());
//
// export const apiModifyBookRequest = (data) =>
//   axios.post("/api/models/items/use/book_reject", data, getAccessTokenHeader());
//
// export const apiFulfillBookRequest = (data) =>
//   axios.post("/api/models/items/use/give", data, getAccessTokenHeader());
//
// export const apiRejectBookRequests = (data) =>
//   axios.post("/api/models/items/use/reject", data, getAccessTokenHeader());
//
// export const apiCommentBookRequest = (id, data) =>
//   axios.post(`/api/models/items/use/${id}`, data, getAccessTokenHeader());
//
// export const apiReturnBookedItems = (data) =>
//   axios.post("/api/models/items/use/return", data, getAccessTokenHeader());
//
// export const apiDeleteItem = (id) =>
//   axios.delete(`/api/models/items/${id}`, getAccessTokenHeader());
//
// export const apiPatchItem = (id, data) =>
//   axios.patch(`/api/models/items/${id}`, data, getAccessTokenHeader());
// WAREHOUSEMAN OPTIONS, ITEMS OPERATIONS

// TREASURER OPTIONS
// export const apiModifyUserBalance = (user_login, data) =>
//   axios.patch(`/api/models/users/${user_login}`, data, getAccessTokenHeader());
// TREASURER OPTIONS
