const autoBind = require("auto-bind");
const { courseModel } = require("../course/course.model");
const courseService = require("../course/course.service");
const createHttpError = require("http-errors");
const { ChapterMessages } = require("../../../common/enums/message.enum");
const { validateObjectId } = require("../../../common/utils/validate-object-id.utils");

class ChapterService {
    #courseService
    #courseModel
    constructor() {
        autoBind(this)
        this.#courseModel = courseModel
        this.#courseService = courseService
    }
    async addChapter(addDto) {
        const { courseId, teacher, title, text } = addDto
        await this.#courseService.getCourseById(courseId, teacher)
        const result = await this.#courseModel.updateOne({ _id: courseId }, {
            $push: {
                chapter: { title, text, episode: [] }
            }
        })
        if (result.modifiedCount == 0) throw new createHttpError.InternalServerError(ChapterMessages.CreatedFailed)
        return {
            message: ChapterMessages.Created
        }
    }
    async getChapter(courseId, teacher) {
        await this.#courseService.getCourseById(courseId, teacher)
        const course = await this.#courseModel.findOne({ _id: courseId }, { chapter: 1, _id: 1, title: 1 })
        if (!course) throw new createHttpError.NotFound(ChapterMessages.NotFound);
        return {
            course
        }
    }
    async getChapterById(id) {
        validateObjectId(id)
        const chapter = await this.#courseModel.findOne({ "chapter._id": id }, { "chapter.$": 1 })
        if (!chapter) throw new createHttpError.NotFound(ChapterMessages.NotFound)
        return chapter
    }
    async removeChapter(chapterId,teacher) {
        await this.getChapterById(chapterId)
        const removeResult = await this.#courseModel.updateOne({teacher, "chapter._id": chapterId }, {
            $pull: {
                chapter: {
                    _id: chapterId
                }
            }
        });
        if (removeResult.modifiedCount == 0) throw new createHttpError.InternalServerError(ChapterMessages.DeleteFailed)
        return {
            message: ChapterMessages.Delete
        }
    }
    async updateChapter(updateDto){
        let {chapterId,title,teacher,text} = updateDto
        const course = await this.getChapterById(chapterId)
        if(!title) title = course.chapter[0]?.title
        if(!text) text = course.chapter[0]?.text
        const updateResult = await this.#courseModel.updateOne({teacher, "chapter._id": chapterId }, {
            $set: {
                "chapter.$": {
                    _id:chapterId,
                    title,
                    text,
                    episode: course.chapter[0]?.episode
                }
            }
        });
        if (updateResult.modifiedCount == 0) throw new createHttpError.InternalServerError(ChapterMessages.UpdateFailed)
            return {
                message: ChapterMessages.Update
            }
    }
}
module.exports = new ChapterService()