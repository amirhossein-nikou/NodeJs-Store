const {Router} = require('express')
const productController = require('./product.controller')
const { uploadFile } = require('../../../common/middlewares/multer.middleware')
const { StringToArray } = require('../../../common/utils/stringToArray.utils')
const { createProductValidation, updateProductValidation } = require('./product.validation')
const { validationResultMiddleware } = require('../../../common/middlewares/validation.middleware')
const router = Router()

router.get("/",productController.getProduct);
router.get("/:id",productController.getById);

//create new product
router.post("/create",uploadFile.array("images",10),
createProductValidation(),validationResultMiddleware
,StringToArray("tags"),StringToArray("color"), productController.create);
//finish create -----

router.delete("/:id", productController.delete)
router.patch("/update",uploadFile.array("images",10),
updateProductValidation(),validationResultMiddleware
,StringToArray("tags"),StringToArray("color"), productController.update)


module.exports  = {ProductRoutes: router}