const autoBind = require("auto-bind");
const courseService = require("./course.service");
const { StatusCodes } = require("http-status-codes");
const { removeFile } = require("../../../common/utils/removeFile.utils");
class CourseController {
    #service
    constructor() {
        autoBind(this)
        this.#service = courseService
    }
    async getCourses(req, res, next) {
        try {
            const teacher = req.user._id
            const search = req.query.search
            const courses = await this.#service.getCourses(teacher, search)
            res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    courses
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async createCourses(req, res, next) {
        try {
            const teacher = req.user._id
            const result = await this.#service.createCourse({ ...req.body, teacher })
            res.status(StatusCodes.CREATED).json({
                status: StatusCodes.CREATED,
                data: {
                    result
                }
            })
        } catch (error) {
            removeFile(req.body?.image)
            next(error)
        }
    }
    async getCourseById(req, res, next) {
        try {
            const teacher = req.user._id
            const id = req.params.id
            const course = await this.#service.getCourseById(id,teacher)
            res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    course
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateCourse(req, res, next) {
        try {
            const teacher = req.user._id
            const result = await this.#service.updateCourse({ ...req.body, teacher })
            res.status(StatusCodes.CREATED).json({
                status: StatusCodes.CREATED,
                data: {
                    result
                }
            })
        } catch (error) {
            removeFile(req.body?.image)
            next(error)
        }
    }
}
module.exports = new CourseController