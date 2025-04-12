// backend/config.js
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env");
}
console.log("JWT_SECRET loaded:", JWT_SECRET); // Debug

module.exports = { JWT_SECRET };