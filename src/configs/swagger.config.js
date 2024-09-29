const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require("swagger-jsdoc")
function SwaggerConfig(app) {
    const swaggerDoc = swaggerJsDoc({
        swaggerDefinition: {
            openapi: "3.1.0",
            info: {
                title: "Store Project",
                description: "this document is for store backend test",
                version: "1.0.0"
            },
            components: {
                securitySchemes: {
                    BearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT"
                    }
                }
            },
            security: [{ BearerAuth: [] }]
        },
        apis: [
            "src/modules/**/*.swagger.js",
            "src/common/**/*.swagger.js",
        ]
    })
    const swagger = swaggerUi.setup(swaggerDoc, {})
    app.use("/swagger", swaggerUi.serve, swagger)
}
module.exports = {
    SwaggerConfig
}