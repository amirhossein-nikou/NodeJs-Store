const rolesEnum = Object.freeze({
    User: "USER",
    Admin: "ADMIN",
    Content_Manager: "CONTENT_MANAGER",
    Teacher: "TEACHER"
})
const permissionsEnum = Object.freeze({
    USER: ["profile"],
    ADMIN: ["all"],
    CONTENT_MANAGER: ["course","blog","category","product"],
    TEACHER: ["course","blog"],
    SUPPLIER: ["product","blog"],
    ALL: "all",
    BLOG:"blog"
})
module.exports = {
    rolesEnum,
    permissionsEnum
}