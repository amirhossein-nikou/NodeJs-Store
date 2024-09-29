const { Router } = require("express");
const { BlogRoutes } = require("./blog/blog.routes");
const { CategoryRoutes } = require("./category/category.routes");
const { ProductRoutes } = require("./product/product.routes");
const { CourseRoutes } = require("./course/course.routes");
const { ChapterRoutes } = require("./chapter/chapter.routes");
const { EpisodeRoutes } = require("./episode/episode.routes");
const { UserRoutes } = require("./user/user.routes");
const { PermissionRoutes } = require("./RBAC/permission/permission.routes");
const { RoleRoutes } = require("./RBAC/role/role.routes");
const { checkPermission } = require("../../common/middlewares/role.guard");
const { permissionsEnum } = require("../../common/enums/role.enum");
const router = Router()
router.use("/category",checkPermission([permissionsEnum.CONTENT_MANAGER]), CategoryRoutes)
router.use("/blog",checkPermission([permissionsEnum.BLOG]),BlogRoutes)
router.use("/product",checkPermission([permissionsEnum.SUPPLIER]),ProductRoutes)
router.use("/course",checkPermission([permissionsEnum.TEACHER]),CourseRoutes)
router.use("/chapter",checkPermission([permissionsEnum.TEACHER]),ChapterRoutes)
router.use("/episode",checkPermission([permissionsEnum.TEACHER]),EpisodeRoutes)
router.use("/user",UserRoutes)
router.use("/role",checkPermission([permissionsEnum.ADMIN]),RoleRoutes)
router.use("/permission",checkPermission([permissionsEnum.ADMIN]),PermissionRoutes)
module.exports = {
    AdminRoutes: router
}