document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('auth-links');
    if (!container) return;

    const user = auth.getUser();
    console.log(user);
    
    if (auth.isLoggedIn() && user) {
        container.innerHTML = `
            <span class="text-light">Hello, ${user.name}</span>
            <a class="nav-link text-light" href="/user/list-users">All Users
            <button class="btn btn-danger btn-sm" id="logout-btn">Logout</button>
        `;

        document.getElementById('logout-btn')
            .addEventListener('click', auth.logout);
    }
    else {
        container.innerHTML = `
            <a class="nav-link text-light" href="/user/list-users">All Users
            <a class="nav-link text-light" href="/login">Login</a>
            <a class="nav-link text-light" href="/register">Register</a>
        `;
    }
});
