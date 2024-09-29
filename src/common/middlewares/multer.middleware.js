const multer = require("multer")
const path = require('path');
const fs = require('fs');
const createHttpError = require("http-errors");
const { BlogMessages, EpisodeMessages } = require("../enums/message.enum");
const { removeFile } = require("../utils/removeFile.utils");
const MB10 = 10 * 1000 * 1000
const MB300 = 300 * 1000 * 1000
function createDirectory(req,dirName) {
    const time = new Date()
    const year = time.getFullYear().toString()
    const month = (time.getMonth() + 1).toString()
    const day = time.getUTCDate().toString()
    const directory = path.join(__dirname, "..", "..", "..", "public", "uploads", dirName, year, month, day)
    req.body.filePath = path.join("uploads", dirName, year, month, day)
    fs.mkdirSync(directory, { recursive: true })
    return directory
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file?.originalname) {
            const filePath = createDirectory(req,"blog")
            return cb(null, filePath)
        }
        cb(createHttpError.BadGateway(), null)
    },
    filename: (req, file, cb) => {
        if (file?.originalname) {
            const propertyName = file.fieldname
            const ext = path.extname(file.originalname)
            const whiteList = [".jpg", ".jpeg", ".png", ".webp"]
            if (!whiteList.includes(ext)) cb(new createHttpError.BadRequest(BlogMessages.ImageFormat), null)
            const imageName = new Date().getTime() + ext
            const image = path.join(req.body?.filePath, imageName)
            req.body[propertyName] = image?.replace(/\\/gi, '/')
            return cb(null, imageName)
        }
        cb(createHttpError.BadGateway(), null)
    }
})
const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file?.originalname) {
            const filePath = createDirectory(req,"course")
            return cb(null, filePath)
        }
        cb(createHttpError.BadGateway(), null)
    },
    filename: (req, file, cb) => {
        if (file?.originalname) {
            const propertyName = file.fieldname
            const ext = path.extname(file.originalname)
            const whiteList = [".mp4", ".mpg", ".mov", ".avi",".mkv"]
            if (!whiteList.includes(ext)) cb(new createHttpError.BadRequest(EpisodeMessages.VideoFormat), null)
            const videoName = new Date().getTime() + ext
            const video = path.join(req.body?.filePath, videoName)
            req.body[propertyName] = video.replace(/\\/gi, '/')
            return cb(null, videoName)
        }
        cb(createHttpError.BadGateway(), null)
    }
})
const uploadFile = multer({ storage, limits: { fileSize: MB10 } })
const uploadVideoFile = multer({storage: videoStorage, limits: { fileSize: MB300 } })
module.exports = {
    uploadFile,
    uploadVideoFile
}