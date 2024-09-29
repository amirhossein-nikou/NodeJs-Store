const { Router } = require("express");
const blogController = require("./blog.controller");
const { uploadFile } = require("../../../common/middlewares/multer.middleware");
const { createBlogValidation, updateBlogValidation } = require("./blog.validation");
const { validationResultMiddleware } = require("../../../common/middlewares/validation.middleware");
const { StringToArray } = require("../../../common/utils/stringToArray.utils");

const router = Router();
router.get("/", blogController.findBlogs);
router.get("/:id", blogController.findById);
router.post("/create",uploadFile.single("image"), createBlogValidation(), validationResultMiddleware,
StringToArray("tags"), blogController.create);

router.patch("/update",uploadFile.single("image"), updateBlogValidation(), validationResultMiddleware,
StringToArray("tags"), blogController.update);
router.delete("/:id", blogController.remove);
module.exports = {
    BlogRoutes: router
}