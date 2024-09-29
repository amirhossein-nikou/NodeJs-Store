const socketIo = require("socket.io");

function initSocket(server){
    // @ts-ignore
    const io = socketIo(server,{
        cors: "*"
    })
    return io
}
module.exports = {
    initSocket
}