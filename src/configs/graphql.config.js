const { graphQLSchema } = require("../graphQL/index.graphql");

function graphQLConfig(req, res) {
    return {
        schema: graphQLSchema,
        graphiql: true,
        context: { req, res }
    }
}
module.exports = {
    graphQLConfig
}