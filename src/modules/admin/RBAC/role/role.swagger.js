/**
 * @swagger
 * definitions:
 *      RoleList:
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      roles:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "66cc491be2d5de5975fd251d"
 *                                  title:
 *                                      type: string
 *                                      example: "role title"
 *                                  permission:
 *                                      type: array
 *                                      example: ["permissions"]
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateRole:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      default: ""
 *                  description:
 *                      type: string
 *                      default: ""
 *                  permission:
 *                      type: array
 *                      items:
 *                          type: string
 *                          default: ""
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateRole:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      default: ""
 *                  description:
 *                      type: string
 *                      default: ""
 *                  permission:
 *                      type: array
 *                      items:
 *                          type: string
 *                          default: ""
 */
/**
 * @swagger
 * /admin/role/list:
 *  get:
 *      summary: get list of roles
 *      tags: 
 *          -   RBAC (Admin panel)
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/RoleList'
 */
/**
 * @swagger
 * /admin/role/create:
 *  post:
 *      summary: create new role
 *      tags: 
 *          -   RBAC (Admin panel)
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateRole'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateRole'
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/publicResult'
 */
/**
 * @swagger
 * /admin/role/update/{roleId}:
 *  patch:
 *      summary: update role
 *      tags: 
 *          -   RBAC (Admin panel)
 *      parameters:
 *          -   in: path
 *              name: roleId
 *              type: string
 *              required: true
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateRole'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateRole'
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/publicResult'
 */
/**
 * @swagger
 * /admin/role/{filed}:
 *  delete:
 *      summary: delete role with id
 *      tags: 
 *          -   RBAC (Admin panel)
 *      parameters:
 *          -   in: path
 *              name: filed
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/publicResult'
 */