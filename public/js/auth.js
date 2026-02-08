const auth = {
    isLoggedIn(){
        return !!localStorage.getItem('token');
    },
    getUser(){
        return JSON.parse(localStorage.getItem('user'));
    },
    getToken(){
        return localStorage.getItem('token')
    },
    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login'
    }
}
