/**
 * @swagger
 * tags:
 *  name: Blog(Admin panel)
 *  description: Manage Blogs (admin access required)
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          BlogSchema:
 *              type: object
 *              required: 
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   image
 *                  -   category
 *              properties:
 *                  title:
 *                      type: string
 *                      default: ""
 *                  short_text:
 *                      type: string
 *                      default: ""
 *                  text:
 *                      type: string
 *                      default: ""
 *                  image:
 *                      type: file
 *                      default: ""
 *                  category:
 *                      type: string
 *                      default: ""
 *                  tags:
 *                      type: array
 *                      items:
 *                          type: string
 *                          default: ""
 *          UpdateBlogSchema:
 *              type: object
 *              required: 
 *                  -   id
 *              properties:
 *                  id:
 *                      type: string
 *                      default: ""
 *                  title:
 *                      type: string
 *                      default: ""
 *                  short_text:
 *                      type: string
 *                      default: ""
 *                  text:
 *                      type: string
 *                      default: ""
 *                  image:
 *                      type: file
 *                      default: ""
 *                  category:
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
 * /admin/blog/:
 *  get:
 *      summary: get all categories
 *      tags:
 *          -   Blog(Admin panel)
 *      responses:
 *          200:
 *              description: success  
 */
/**
 * @swagger
 * /admin/blog/{id}:
 *  get:
 *      summary: get one blog with id
 *      tags:
 *          -   Blog(Admin panel)
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *      responses:
 *          200:
 *              description: success  
 */
/**
 * @swagger
 * /admin/blog/create:
 *  post:
 *      summary: create new blog
 *      tags:
 *          -   Blog(Admin panel)
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/BlogSchema'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/BlogSchema'
 *      responses:
 *          200:
 *              description: success  
 */
/**
 * @swagger
 * /admin/blog/update:
 *  patch:
 *      summary: update blog
 *      tags:
 *          -   Blog(Admin panel)
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateBlogSchema'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateBlogSchema'
 *      responses:
 *          200:
 *              description: success
 */
/**
 * @swagger
 * /admin/blog/{id}:
 *  delete:
 *      summary: delete blog with id
 *      tags:
 *          -   Blog(Admin panel)
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *      responses:
 *          200:
 *              description: success  
 */
