const rateLimit = require("express-rate-limit");

//Utiliser rateLimit pour limiter nombre de req à 30 par heure
const limiter = rateLimit({
    max: 30,
    windowMs: 60 * 60 * 1000,
    message: "Too many request from this IP"
 });

 module.exports = limiter;
