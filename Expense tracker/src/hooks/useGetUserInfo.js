export const useGetUserInfo = ()=> {
    const {name, profilephoto, userID, isAuth } = JSON.parse(localStorage.getItem("auth"))

    return {name, profilephoto, userID, isAuth}
}