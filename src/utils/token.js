export const setToken = (token) => {
    localStorage.setItem("TOKEN", token);
}
// 获取本地token
export const getToken = () => {
    return localStorage.getItem("TOKEN");
}
//清除本地的token
export const removeToken = () => {
    localStorage.removeItem("TOKEN")
}