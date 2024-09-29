/**
 * @swagger
 * definitions:
 *      PermissionList:
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
 *                                  title:
 *                                      type: string
 *                                      example: "role title"
 *                                  description:
 *                                      type: string
 *                                      example: "description for permission"
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdatePermission:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      default: ""
 *                  description:
 *                      type: string
 *                      default: ""
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          CreatePermission:
 *              type: object
 *              required:
 *                  -   title
 *                  -   description
 *              properties:
 *                  title:
 *                      type: string
 *                      default: ""
 *                  description:
 *                      type: string
 *                      default: ""
 */
/**
 * @swagger
 * /admin/permission/list:
 *  get:
 *      summary: get list of permissions
 *      tags: 
 *          -   RBAC (Admin panel)
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/PermissionList'
 */
/**
 * @swagger
 * /admin/permission/create:
 *  post:
 *      summary: create new permission
 *      tags: 
 *          -   RBAC (Admin panel)
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CreatePermission'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreatePermission'
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
 * /admin/permission/update/{permissionId}:
 *  patch:
 *      summary: update permission
 *      tags: 
 *          -   RBAC (Admin panel)
 *      parameters:
 *          -   in: path
 *              name: permissionId
 *              type: string
 *              required: true
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdatePermission'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdatePermission'
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
 * /admin/permission/{permissionId}:
 *  delete:
 *      summary: delete permission with id
 *      tags: 
 *          -   RBAC (Admin panel)
 *      parameters:
 *          -   in: path
 *              name: permissionId
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