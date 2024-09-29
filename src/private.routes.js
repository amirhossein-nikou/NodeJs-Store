const { Router } = require("express");
const bcrypt = require("bcrypt")
const router = Router();
const crypto = require('crypto');
router.post("/hashPassword/:password",(req,res,next) => {
    try {
        const password = req.params.password;
        const salt = bcrypt.genSaltSync(10);
        res.send(bcrypt.hashSync(password,salt))
    } catch (error) {
        next(error)
    }
})
router.get("/randomNumber",(req,res,next) => {
    try {
        res.send({
            date: {
                randomInt: crypto.randomInt(10000,99999).toString()
            }
        })
    } catch (error) {
        next(error)
    }
})
module.exports = {PrivateRoutes: router}