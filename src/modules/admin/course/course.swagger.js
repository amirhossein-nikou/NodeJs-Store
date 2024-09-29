/**
 * @swagger
 * tags:
 *  name: Course(Admin panel)
 *  description: mange course api
 */
/**
 * @swagger
 * definitions:
 *      CourseList:
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                                  example: 66b33c377ef43101ff1e3d1d
 *                              title:
 *                                  type: string
 *                                  example: title
 *                              shortDesc:
 *                                  type: string
 *                                  example: short description
 *                              description:
 *                                  type: string
 *                                  example: description
 *                              image:
 *                                  type: string
 *                                  example: /upload/image/../../..
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateCourse:
 *              type: object
 *              required:
 *                  -   type
 *                  -   title
 *                  -   shortDesc
 *                  -   description
 *                  -   price
 *                  -   image
 *                  -   category
 *              properties:
 *                  type:
 *                      type: string
 *                      enum: ["free" , "cash" , "special"]
 *                  title:
 *                      type: string
 *                      default: ""
 *                  shortDesc:
 *                      type: string
 *                      default: ""
 *                  description:
 *                      type: string
 *                      default: ""
 *                  price:
 *                      type: string
 *                      default: ""
 *                  image:
 *                      type: file
 *                  category:
 *                      type: string
 *                      default: ""
 *                  discount:
 *                      type: string
 *                      default: ""
 *                  tags:
 *                      type: array
 *                      items:
 *                          type: string
 *                          default: ""
 *          UpdateCourse:
 *              type: object
 *              required:
 *                  -   courseId
 *              properties:
 *                  courseId:
 *                      type: string
 *                      default: ""
 *                  type:
 *                      type: string
 *                      enum: ["free" , "cash" , "special"]
 *                  title:
 *                      type: string
 *                      default: ""
 *                  shortDesc:
 *                      type: string
 *                      default: ""
 *                  description:
 *                      type: string
 *                      default: ""
 *                  price:
 *                      type: string
 *                      default: ""
 *                  image:
 *                      type: file
 *                  category:
 *                      type: string
 *                      default: ""
 *                  discount:
 *                      type: string
 *                      default: ""
 *                  tags:
 *                      type: array
 *                      items:
 *                          type: string
 *                          default: ""
 */
/**
 * @swagger
 * /admin/course/:
 *  get:
 *      summary: get list of all your courses
 *      tags:
 *          -   Course(Admin panel)
 *      parameters:
 *          -   in: query
 *              name: search
 *              type: string
 *              description: find your course by searching in text
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/CourseList'
*/
/**
 * @swagger
 * /admin/course/{id}:
 *  get:
 *      summary: get courses by course id
 *      tags:
 *          -   Course(Admin panel)
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              description: find your course by searching course id
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/CourseList'
*/
/**
 * @swagger
 * /admin/course/create:
 *  post:
 *      summary: create new course
 *      tags:
 *          -   Course(Admin panel)
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateCourse'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateCourse'
 *      responses:
 *           200:
 *              description: create successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/publicResult'
 */
/**
 * @swagger
 * /admin/course/update:
 *  patch:
 *      summary: update course
 *      tags:
 *          -   Course(Admin panel)
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateCourse'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateCourse'
 *      responses:
 *           200:
 *              description: create successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/publicResult'
 */
