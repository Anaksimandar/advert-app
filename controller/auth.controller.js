import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from "../repository/user.repository.js";

const authenticate = (req,res,next) => {
    console.log('radii');
    
    const authHeader = req.headers.authorization;
    console.log(req.headers);

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message:"Unauthorized"})
    }
    
    const token = authHeader.split(" ")[1];

    try{
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedUser;
        console.log(req.user);
        
        next()
    }
    catch(error){
        return res.status(401).json({message: "Invalid or expired token"});
    }
}
const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send('Name, email, and password are required');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    try{
        const result = createUser({ name, email, password_hash: passwordHash });

        res.status(201).json({ id: result.lastInsertRowid, name, email });
    }
    catch (error){
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return  res.status(409).send('Email already in use');
        }
        throw error;
    }
}

const login = async (req, res)=>{
    console.log(req.body);
    
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message:"Email and password are required"});
    }

    const user = findUserByEmail(email);

    if(!user){
        return res.status(404).json({message:"Invalid credentials"});
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        {
            sub: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        }
    });
}

export {
    register,
    login,
    authenticate
}
