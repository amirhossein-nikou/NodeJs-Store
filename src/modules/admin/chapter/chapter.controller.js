const autoBind = require("auto-bind");
const chapterService = require("./chapter.service");
const { StatusCodes } = require("http-status-codes");

class ChapterController {
    #service
    constructor() {
        autoBind(this)
        this.#service = chapterService
    }
    async addChapter(req, res, next) {
        try {
            const teacher = req.user._id
            const addDto = req.body
            const data = await this.#service.addChapter({ teacher, ...addDto })
            res.status(StatusCodes.CREATED).json({
                status: StatusCodes.CREATED,
                data
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    async getChapter(req, res, next) {
        try {
            const teacher = req.user._id
            const courseId = req.params.courseId
            const data = await this.#service.getChapter(courseId,teacher)
            res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data
            })
        } catch (error) {
            next(error)
        }
    }
    async getChapterById(req, res, next) {
        try {
            const chapterId = req.params.chapterId
            const data = await this.#service.getChapterById(chapterId)
            res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data
            })
        } catch (error) {
            next(error)
        }
    }
    async removeChapter(req, res, next) {
        try {
            const teacher = req.user._id
            const chapterId = req.params.chapterId
            const data = await this.#service.removeChapter(chapterId,teacher)
            res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data
            })
        } catch (error) {
            next(error)
        }
    }
    async updateChapter(req, res, next) {
        try {
            const teacher = req.user._id
            const updateDto = req.body
            const data = await this.#service.updateChapter({teacher,...updateDto})
            res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data
            })
        } catch (error) {
            next(error)
        }
    }
    
}

module.exports = new ChapterController()