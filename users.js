let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
    { id: 4, name: 'Diana', email: 'diana@example.com' },
    { id: 5, name: 'Eve', email: 'eve@example.com' }
];

const getAllUsers = () => {
    return users;
}

const getUserById = (id) => {
    return users.find(user => user.id === id);
}

const createUser = (name, email) => {
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);

    return newUser;
}

const deleteUser = (id) => {
    const exists = users.some(user => user.id === id);
    if (exists) {
        users = users.filter(user => user.id !== id);
        console.log(users);

        return true;
    }
    return false;
}

const updateUser = (id, name, email) => {
    const user = users.filter(user => user.id === id)[0];

    if (user) {
        user.name = name;
        user.email = email;
    }
    
    return user;
}

export {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
};