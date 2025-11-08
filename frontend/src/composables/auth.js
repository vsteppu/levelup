export const useAuthState = () => {
    let user
    
    const setUser = (user) => {
        localStorage.setItem('user', JSON.stringify(user))
        user = JSON.parse(localStorage.getItem('user'))
    }

    const getUser = () => {
        const response = JSON.parse(localStorage.getItem('user'))
        return response?.user || {}
    }

    const isAuthenticated = () => {
        const response = JSON.parse(localStorage.getItem('user'))
        console.log('response: ', response);
        return response?.success ?? false
    }

    return {
        user,
        setUser,
        getUser,
        isAuthenticated,
    }
}