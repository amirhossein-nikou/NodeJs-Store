const { Router } = require("express");
const homeController = require("./home.controller");

const router = Router()
router.get("/",homeController.homePage)
module.exports = {
    HomeRouter: router
}