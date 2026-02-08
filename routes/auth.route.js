import express from "express";
import { register, login } from "../controller/auth.controller.js";

const router = express.Router();

router.get('/login',(req,res)=>{
    res.render('login');
})
router.post('/login',login)

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

router.post('/register', register);

export default router;