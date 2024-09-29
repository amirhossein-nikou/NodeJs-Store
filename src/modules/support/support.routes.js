const { Router } = require("express");
const supportController = require("./support.controller");
const { NamespaceRoutes } = require("./namespace/namespace.routes");
const { RoomRoutes } = require("./room/room.routes");
const { checkLogin, checkAccessLogin } = require("../../common/middlewares/auth.middleware");

const router = Router()
router.get("/", checkLogin, supportController.renderChatRoom)
router.get("/login", checkAccessLogin, supportController.loginForm)
router.post("/login", supportController.login)
router.use("/namespace", NamespaceRoutes)
router.use("/room", RoomRoutes)
module.exports = {
   SupportRoutes: router
}