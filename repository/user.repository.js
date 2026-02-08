import db from "../db/db.js";

const createUser = ({name, email, password_hash}) => {

  const stmt = db.prepare("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)");
  const result = stmt.run(name, email, password_hash);

  return result;
}

const findUserByEmail = (email) => {
    const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
    const user = stmt.get(email);

    return user;
}


export {
    createUser,
    findUserByEmail
}


