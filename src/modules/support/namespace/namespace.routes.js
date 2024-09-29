const { Router } = require("express");
const namespaceController = require("./namespace.controller");

const router = Router()
router.post("/create", namespaceController.addNamespace)
router.get("/list", namespaceController.getNamespaceList)
module.exports = {
    NamespaceRoutes: router
}