const { Router } = require("express");
const roomController = require("./room.controller");
const { uploadFile } = require("../../../common/middlewares/multer.middleware");

const router = Router()
router.post("/create",uploadFile.single("image"), roomController.addRoom)
router.get("/list", roomController.getRoomList)
module.exports = {
    RoomRoutes: router
}