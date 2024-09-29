/**
 * @swagger
 * tags:
 *  name: User (Admin panel)
 *  description: manage users in admin panel 
 */
/**
 * @swagger
 * definitions:
 *      UserList:
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      users:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "mongo id"
 *                                  firstName:
 *                                      type: string
 *                                      example: "name"
 *                                  lastName:
 *                                      type: string
 *                                      example: "last name"
 *                                  username:
 *                                      type: string
 *                                      example: "username"
 *                                  email:
 *                                      type: string
 *                                      example: "example@exa.ex"                           
 *                                  phone:
 *                                      type: string
 *                                      example: "09xxxxxxxxx"
 *                                  bills:
 *                                      type: array
 *                                      example: []   
 *                                  discount:
 *                                      type: number
 *                                      example: 60
 *                                  createdAt:
 *                                      type: date
 *                                      example: 2024-08-06T17:12:02.375Z
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateUser:
 *              type: object
 *              properties:
 *                  firstname:
 *                      type: string
 *                      default: ""
 *                  lastname:
 *                      type: string
 *                      default: ""
 *                  username:
 *                      type: string
 *                      default: ""
 *                  birthday:
 *                      type: string
 *                      default: ""
 */
/**
 * @swagger
 * /admin/user/list:
 *  get:
 *      summary: get list of users
 *      tags: 
 *          -   User (Admin panel)
 *      parameters:
 *          -   in: query
 *              name: search
 *              type: string
 *              description: find your course by search in username, email, phone, firstName, lastName
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/UserList'
 */
/**
 * @swagger
 * /admin/user/profile:
 *  get:
 *      summary: show current user profile
 *      tags: 
 *          -   User (Admin panel)
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/UserList'
 */
/**
 * @swagger
 * /admin/user/update:
 *  patch:
 *      summary: update user profile
 *      tags: 
 *          -   User (Admin panel)
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateUser'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateUser'
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/publicResult'
 */