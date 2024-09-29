/**
 * @swagger
 * tags:
 *  name: Episode(Admin panel)
 *  description: mange Episode api
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
 *          AddEpisode:
 *              type: object
 *              required:
 *                  -   courseId
 *                  -   chapterId
 *                  -   title
 *                  -   text
 *                  -   video
 *              properties:
 *                  courseId:
 *                      type: string
 *                      default: ""
 *                  chapterId:
 *                      type: string
 *                      default: ""
 *                  title:
 *                      type: string
 *                      default: ""
 *                  text:
 *                      type: string
 *                      default: ""
 *                  type:
 *                      type: string
 *                      enum: ["lock","unlock"]
 *                  video:
 *                      type: file
 *                      default: ""
 *          UpdateEpisode:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      default: ""
 *                  text:
 *                      type: string
 *                      default: ""
 *                  type:
 *                      type: string
 *                      enum: ["lock","unlock"]
 *                  video:
 *                      type: file
 *                      default: ""
 */
/**
 * @swagger
 * /admin/episode/add:
 *  post:
 *      summary: add new episode to your chapter
 *      tags:
 *          -   Episode(Admin panel)
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/AddEpisode'
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
 * /admin/episode/remove/{episodeId}:
 *  delete:
 *      summary: remove episode use id
 *      tags:
 *          -   Episode(Admin panel)
 *      parameters:
 *          -   in: path
 *              name: episodeId
 *              type: string
 *              required: true
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
 * /admin/episode/update/{episodeId}:
 *  patch:
 *      summary: update episode
 *      tags:
 *          -   Episode(Admin panel)
 *      parameters:
 *          -   in: path
 *              name: episodeId
 *              type: string
 *              required: true
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateEpisode'
 *      responses:
 *           201:
 *              description: create successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/publicResult'
 */