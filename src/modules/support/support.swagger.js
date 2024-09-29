/**
 * @swagger
 * tags:
 *  name: support
 *  description: support chat api
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateNamespace:
 *              type: object
 *              required:
 *                  -   title
 *                  -   endpoint
 *              properties:
 *                  title:
 *                      type: string
 *                      default: ''
 *                  endpoint:
 *                      type: string
 *                      default: ''
 *          CreateRoom:
 *              type: object
 *              required:
 *                  -   namespace
 *                  -   name
 *                  -   description
 *              properties:
 *                  namespace:
 *                      type: string
 *                      default: ""
 *                  name:
 *                      type: string
 *                      default: ""
 *                  description:
 *                      type: string
 *                      default: ""
 *                  image:
 *                      type: file
 *                      default: ""
 */
/**
 * @swagger
 * /support/namespace/create:
 *  post:
 *      summary: create new namespace
 *      tags:
 *          -   support
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateNamespace'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateNamespace'
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
 * /support/room/create:
 *  post:
 *      summary: create new room
 *      tags:
 *          -   support
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateRoom'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateRoom'
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/publicResult'
 */