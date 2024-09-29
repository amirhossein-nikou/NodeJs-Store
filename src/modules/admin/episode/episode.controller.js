const autoBind = require("auto-bind");
const episodeService = require("./episode.service");
const { removeFile } = require("../../../common/utils/removeFile.utils");
const { StatusCodes } = require("http-status-codes");

class EpisodeController{
    #service
    constructor(){
        autoBind(this)
        this.#service = episodeService
    }
    async addEpisode(req,res,next){
        try {
            const teacher = req.user._id
            const createDto = req.body
            const data = await this.#service.addEpisode({teacher,...createDto})
            res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data
            })
        } catch (error) {
            removeFile(req.body.video)
            next(error)
        }
    }
    async removeEpisode(req,res,next){
        try {
            const teacher = req.user._id
            const episodeId = req.params.episodeId
            const data = await this.#service.removeEpisode(episodeId,teacher)
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data
            })
        } catch (error) {
            next(error)
        }
    }
    async updateEpisode(req,res,next){
        try {
            const teacher = req.user._id
            const episodeId = req.params.episodeId
            const updateDto = req.body
            console.log(updateDto);
            const data = await this.#service.updateEpisode({episodeId,teacher,...updateDto})
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new EpisodeController()