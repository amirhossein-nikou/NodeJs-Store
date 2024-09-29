const { conversationModel } = require("../modules/support/conversation.model")
const path = require('path');
const fs = require('fs');
class NamespaceHandler {
    #io
    constructor(io) {
        this.#io = io
    }
    connection() {
        this.#io.on("connection", async (socket) => {
            const namespaceList = await conversationModel.find({}, { title: 1, endpoint: 1 }).sort({ _id: -1 })
            socket.emit("namespaceList", namespaceList)
        })
    }
    async createNamespaceConnection() {
        const namespaceList = await conversationModel.find({}, { title: 1, endpoint: 1, rooms: 1 }).sort({ _id: -1 })
        for (const namespace of namespaceList) {
            this.#io.of(`/${namespace.endpoint}`).on("connection", async (socket) => {
                const conversation = await conversationModel.findOne({ endpoint: namespace.endpoint },
                    { title: 1, endpoint: 1, rooms: 1 }).sort({ _id: -1 })
                socket.emit("roomList", conversation.rooms)
                socket.on("joinRoom", async roomName => {
                    const lastRoom = Array.from(socket.rooms)?.[1]
                    if (lastRoom) {
                        socket.leave(lastRoom)
                        await this.getCountOfOnlineUsers(namespace.endpoint, roomName)
                    }
                    socket.join(roomName)
                    await this.getCountOfOnlineUsers(namespace.endpoint, roomName)
                    const roomInfo = conversation.rooms?.find(item => item.name == roomName)
                    socket.emit("roomInfo", roomInfo)
                    this.getNewMessage(socket)
                    //this.getNewLocation(socket)
                    this.uploadFiles(socket)
                    socket.on("disconnect", async () => {
                        await this.getCountOfOnlineUsers(namespace.endpoint, roomName)
                    })
                })
            })
        }
    }
    async getCountOfOnlineUsers(endpoint, roomName) {
        const onlineUsers = await this.#io.of(`/${endpoint}`).in(roomName).allSockets();
        console.log(onlineUsers);
        this.#io.emit("onlineUsers", Array.from(onlineUsers).length)
    }
    getNewMessage(socket) {
        socket.on("newMessage", async data => {
            const { message, roomName, endpoint, sender } = data
            console.log(data);
            const updateResult = await conversationModel.updateOne({ endpoint, "rooms.name": roomName },
                {
                    $push: {
                        "rooms.$.message": {
                            sender,
                            message,
                            dateTime: Date.now()
                        }
                    }
                }
            )
            this.#io.of(`/${endpoint}`).in(roomName).emit("confirmMessage", data)
        })
    }
    // getNewLocation(socket) {
    //     socket.on("newLocation", async data => {
    //         if (!data) return ""
    //         const { location, roomName, endpoint, sender } = data
    //         console.log(data);
    //         const updateResult = await conversationModel.updateOne({ endpoint, "rooms.name": roomName },
    //             {
    //                 $push: {
    //                     "rooms.$.location": {
    //                         sender,
    //                         location,
    //                         dateTime: Date.now()
    //                     }
    //                 }
    //             }
    //         )
    //         this.#io.of(`/${endpoint}`).in(roomName).emit("confirmLocation", data)
    //     })
    // }
    uploadFiles(socket) {
        socket.on("upload", ({ file, filename }, callback) => {
            const ext = path.extname(filename)
            fs.writeFile("public/uploads/sockets/" + String(Date.now() + ext), file, (err) => {
                callback({ message: err ? "failure" : "success" })
            })
        })
    }
}
module.exports = {
    NamespaceHandler
}