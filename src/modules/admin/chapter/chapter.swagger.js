/**
 * @swagger
 * tags:
 *  name: Chapter(Admin panel)
 *  description: mange chapter api
 */
/**
 * @swagger
 * definitions:
 *      getOneChapter:
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                          example: 66b33c377ef43101ff1e3d1d
 *                      chapters:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: 66b33c377ef43101ff1e3d1d
 *                                  title:
 *                                      type: string
 *                                      example: chapter title
 *                                  text:
 *                                      type: string
 *                                      example: chapter description                                      
 */
/**
 * @swagger
 * definitions:
 *      getChapterResult:
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                          example: 66b33c377ef43101ff1e3d1d
 *                      title:
 *                          type: string
 *                          example: course title
 *                      chapters:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: 66b33c377ef43101ff1e3d1d
 *                                  title:
 *                                      type: string
 *                                      example: chapter title
 *                                  text:
 *                                      type: string
 *                                      example: chapter description                                      
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          AddChapter:
 *              type: object
 *              required:
 *                  -   courseId
 *                  -   title
 *              properties:
 *                  courseId:
 *                      type: string
 *                      default: ""
 *                  title:
 *                      type: string
 *                      default: ""
 *                  text:
 *                      type: string
 *                      default: ""
 *          UpdateChapter:
 *              type: object
 *              required:
 *                  -   chapterId
 *              properties:
 *                  chapterId:
 *                      type: string
 *                      default: ""
 *                  title:
 *                      type: string
 *                      default: ""
 *                  text:
 *                      type: string
 *                      default: ""
 */
/**
 * @swagger
 * /admin/chapter/list/{courseId}:
 *  get:
 *      summary: get all chapters
 *      tags:
 *          -   Chapter(Admin panel)
 *      parameters:
 *          -   in: path
 *              name: courseId
 *              type: string
 *              required: true
 *      responses:
 *           200:
 *              description: create successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/getChapterResult'
 */
/**
 * @swagger
 * /admin/chapter/getOne/{chapterId}:
 *  get:
 *      summary: get chapter by id
 *      tags:
 *          -   Chapter(Admin panel)
 *      parameters:
 *          -   in: path
 *              name: chapterId
 *              type: string
 *              required: true
 *      responses:
 *           200:
 *              description: create successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/getOneChapter'
 */
/**
 * @swagger
 * /admin/chapter/add:
 *  put:
 *      summary: add new chapter to your course
 *      tags:
 *          -   Chapter(Admin panel)
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/AddChapter'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/AddChapter'
 *      responses:
 *           201:
 *              description: create successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/publicResult'
 */
/**
 * @swagger
 * /admin/chapter/remove/{chapterId}:
 *  delete:
 *      summary: remove a chapter by id
 *      tags:
 *          -   Chapter(Admin panel)
 *      parameters:
 *          -   in: path
 *              name: chapterId
 *              required: true
 *              type: string
 *      responses:
 *           201:
 *              description: create successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/publicResult'
 */
/**
 * @swagger
 * /admin/chapter/update:
 *  patch:
 *      summary: update chapters
 *      tags:
 *          -   Chapter(Admin panel)
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateChapter'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateChapter'
 *      responses:
 *           201:
 *              description: create successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/publicResult'
 */
