const dotenv =require("dotenv");

dotenv.config();
const PORT = process.env.PORT||5000;
const JWT= process.env.JWT_SECRET_KEY||"SECRET_567";

module.exports = {PORT,JWT};