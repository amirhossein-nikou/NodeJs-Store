const { Router } = require("express");
const { AuthRouter } = require("./modules/auth/auth.routes");
const { PrivateRoutes } = require("./private.routes");
const { AuthValidation } = require("./common/middlewares/auth.middleware");
const { AdminRoutes } = require("./modules/admin/admin.routes");
const { graphQLConfig } = require("./configs/graphql.config");
const { graphqlHTTP } = require("express-graphql");
const { PaymentRoutes } = require("./modules/api/payment/payment.routes");
const { HomeRouter } = require("./modules/api/home/home.routes");
const { SupportRoutes } = require("./modules/support/support.routes");


const router = Router()
router.use("/", HomeRouter)
router.use("/payment", PaymentRoutes)
router.use("/support", SupportRoutes)
router.use("/auth", AuthRouter)
router.use("/developer", PrivateRoutes)
router.use("/admin", AuthValidation, AdminRoutes)
// graph QL route 
router.use("/graphQL", graphqlHTTP(graphQLConfig))
module.exports = {
    AllRoutes: router
}
