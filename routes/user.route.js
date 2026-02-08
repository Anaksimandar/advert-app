import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../users.js';
import { authenticate } from '../controller/auth.controller.js';

const ruter = express.Router();

ruter.get('/list-users', authenticate, (req, res) => {
    res.render('list-users', { users: getAllUsers(), title: 'All Users' });
});

ruter.get('/edit/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = getUserById(userId);
    if (!user){
        return res.render('404');
    }
    res.render('edit-user', { user, title: 'Edit User' });
})

ruter.post('/', (req, res) => {
    const data = req.body;

    if (!data.name) {
        return res.status(400).send('Name is required');
    }

    const newUser = createUser(data.name);

    res.status(201).json(newUser);
});

ruter.post('/edit/:id', authenticate, (req, res) => {
    const data = req.body;
    const userId = parseInt(req.params.id);
    console.log(data.name);
    
    if (!data.name || !data.email) {
        return res.status(400).send('Name and email are required');
    }

    const newUser = updateUser(userId, data.name, data.email);

    if(!newUser){
        return res.status(404).send('User not found');
    }

    res.render('list-users', { users: getAllUsers(), title: 'All Users' });
});

ruter.delete('/:id', (req, res) => {
    const response = {status:'',message:''};
    const userId = parseInt(req.params.id);
    const success = deleteUser(userId);

    if (success) {
        res.status(200).json({ message: 'Deleted' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
    
});

export default ruter;


