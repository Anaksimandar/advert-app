import express from "express";
import bodyParser from 'body-parser';
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import "./db/init.js";
import dotenv from "dotenv";
import expressLayouts from "express-ejs-layouts";
dotenv.config();

const app = express();
const PORT = 3000;


const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}

app.set('view engine', 'ejs');
app.set('views', 'views/');

app.use(expressLayouts);
app.set('layout', 'layout');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger);
app.use("/user", userRoutes);
app.use("/", authRoutes);

app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});