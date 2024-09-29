/**
 * @swagger
 * tags:
 *  name: Product(Admin panel)
 *  description: Manage products (admin access required)
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateProduct:
 *              type: object
 *              required:
 *                  -   type
 *                  -   title
 *                  -   shortDesc
 *                  -   description
 *                  -   price
 *                  -   images
 *                  -   count
 *                  -   discount
 *                  -   category
 *              properties:
 *                  type:
 *                      type: string
 *                      enum: ["virtual" , "physical"]
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
 *                  images:
 *                      type: array
 *                      items:
 *                          type: file
 *                          default: "" 
 *                  count:
 *                      type: string
 *                      default: ""
 *                  discount:
 *                      type: string
 *                      default: ""
 *                  category:
 *                      type: string
 *                      default: ""
 *                  weight:
 *                      type: string
 *                      description: package weight in gram (g) for physical product
 *                      default: ""
 *                  height:
 *                      type: string
 *                      description: package height (cm) for physical product
 *                      default: ""
 *                  length:
 *                      type: string
 *                      description: package length (cm) for physical product
 *                      default: ""
 *                  width:
 *                      type: string
 *                      description: package width (cm) for physical product
 *                      default: ""
 *                  color:
 *                      type: array
 *                      description: input RGB color for physical product
 *                      items:
 *                          type: string
 *                          default: "" 
 *                  tags:
 *                      type: array
 *                      items:
 *                          type: string
 *                          default: "" 
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateProduct:
 *              type: object
 *              required:
 *                  -   productId
 *              properties:
 *                  productId:
 *                      type: string
 *                      default: ""
 *                  type:
 *                      type: string
 *                      enum: ["virtual" , "physical"]
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
 *                  images:
 *                      type: array
 *                      items:
 *                          type: file
 *                          default: "" 
 *                  count:
 *                      type: string
 *                      default: ""
 *                  discount:
 *                      type: string
 *                      default: ""
 *                  category:
 *                      type: string
 *                      default: ""
 *                  weight:
 *                      type: string
 *                      description: package weight in gram (g) for physical product
 *                      default: ""
 *                  height:
 *                      type: string
 *                      description: package height (cm) for physical product
 *                      default: ""
 *                  length:
 *                      type: string
 *                      description: package length (cm) for physical product
 *                      default: ""
 *                  width:
 *                      type: string
 *                      description: package width (cm) for physical product
 *                      default: ""
 *                  color:
 *                      type: array
 *                      description: input RGB color for physical product
 *                      items:
 *                          type: string
 *                          default: "" 
 *                  tags:
 *                      type: array
 *                      items:
 *                          type: string
 *                          default: "" 
 */
/**
 * @swagger
 * /admin/product/{id}:
 *  get:
 *      summary: get product by id
 *      tags:
 *          -   Product(Admin panel)
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      responses:
 *          200:
 *              description: success
 */
/**
 * @swagger
 * /admin/product/:
 *  get:
 *      summary: get all uploaded product by this supplier
 *      tags:
 *          -   Product(Admin panel)
 *      parameters:
 *          -   in: query
 *              name: search
 *              type: string
 *      responses:
 *          200:
 *              description: success
 */
/**
 * @swagger
 * /admin/product/create:
 *  post:
 *      summary: created new product for website
 *      tags:
 *          -   Product(Admin panel)
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateProduct'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateProduct'
 *      responses:
 *          201:
 *              description: create successfully       
 */
/**
 * @swagger
 * /admin/product/{id}:
 *  delete:
 *      summary: delete product by id
 *      tags:
 *          -   Product(Admin panel)
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      responses:
 *          200:
 *              description: success
 */
/**
 * @swagger
 * /admin/product/update:
 *  patch:
 *      summary: update product by id
 *      tags:
 *          -   Product(Admin panel)
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateProduct'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateProduct' 
 *      responses:
 *          200:
 *              description: success
 */