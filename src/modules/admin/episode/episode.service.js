const autoBind = require("auto-bind");
const { courseModel } = require("../course/course.model");
const { default: getVideoDuration } = require("get-video-duration");
const { getTime } = require("../../../common/utils/getTime.utils");
const createHttpError = require("http-errors");
const { ChapterMessages, CourseMessages, EpisodeMessages } = require("../../../common/enums/message.enum");
const { validateObjectId } = require("../../../common/utils/validate-object-id.utils");
const { removeFile } = require("../../../common/utils/removeFile.utils");
class EpisodeService {
    #courseModel
    constructor() {
        autoBind(this)
        this.#courseModel = courseModel
    }
    async addEpisode(createDto) {
        const { title, text, video, chapterId, courseId, teacher, type } = createDto
        const videoURL = `${process.env.HOST}:${process.env.PORT}/${video}`
        const duration = await getVideoDuration(videoURL)
        const time = getTime(duration)
        const addResult = await this.#courseModel.updateOne({ _id: courseId, "chapter._id": chapterId, teacher }, {
            $push: {
                "chapter.$.episode": {
                    title, video, text, time, type
                }
            }
        })
        if (addResult.modifiedCount == 0) throw new createHttpError.InternalServerError(ChapterMessages.CreatedFailed)
        return {
            message: ChapterMessages.Created
        }
    }
    async removeEpisode(episodeId, teacher) {
        validateObjectId(episodeId)
        validateObjectId(teacher)
        const episode = await this.getOneEpisode(episodeId, teacher)
        const removeResult = await this.#courseModel.updateOne({ "chapter.episode._id": episodeId, teacher }, {
            $pull: {
                "chapter.$.episode": {
                    _id: episodeId
                }
            }
        })
        if (removeResult.modifiedCount == 0) throw new createHttpError.InternalServerError(ChapterMessages.DeleteFailed)
        removeFile(episode.video)
        return {
            message: ChapterMessages.Delete
        }
    }
    async updateEpisode(updateDto) {
        let { episodeId, teacher, text, video, title, type } = updateDto
        const episode = await this.getOneEpisode(episodeId, teacher)
        let time ;
        if (video) {
            const videoURL = `${process.env.HOST}:${process.env.PORT}/${video}`
            removeFile(episode.video)
            const duration = await getVideoDuration(videoURL)
            time = getTime(duration)
        }
        console.log(title);
        const updateResult = await this.#courseModel.updateOne({ "chapter.episode._id": episodeId, teacher }, {
            $set: {
                "chapter.$.episode": {
                    _id: episodeId || episode._id,
                    title: title || episode.title,
                    text: text || episode.text,
                    video: video || episode.video,
                    type: type || episode.type,
                    time: time || episode.time,
                }
            }
        })
        if (updateResult.modifiedCount == 0) throw new createHttpError.InternalServerError(ChapterMessages.UpdateFailed)
        return {
            message: ChapterMessages.Update
        }
    }


    async getOneEpisode(episodeId, teacher) {
        validateObjectId(episodeId)
        validateObjectId(teacher)
        const course = await this.#courseModel.findOne({ "chapter.episode._id": episodeId, teacher })
        if (!course || !course.chapter[0]) throw new createHttpError.NotFound(CourseMessages.NotFound)
        let episode = course.chapter?.[0].episode[0]
        if (!episode) throw new createHttpError.NotFound(EpisodeMessages.NotFound)
        return episode
    }
}
module.exports = new EpisodeService()

//------- fix list
// all episode delete after episode update
// can not get one specific episode in get one episode it returns first episode of first chapter