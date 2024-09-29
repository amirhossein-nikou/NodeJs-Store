function getTime(seconds) {
    let total = Math.round(seconds) / 60 // 12818.21
    let [minute, percent] = String(total).split(".") //[12818,21]
    let second = Math.round((Number(percent) * 60) / 100).toString().substring(0, 2)
    let hour = "0"
    if (Number(minute) > 60) {
        total = Number(minute) / 60
        let [h1, percent] = String(total).split(".")
        hour = h1
        minute = Math.round((Number(percent) * 60) / 100).toString().substring(0, 2)
    }
    if (second.length == 1) second = `0${second}`
    if (minute.length == 1) minute = `0${minute}`
    if (hour.length == 1) hour = `0${hour}`
    return (hour + ":" + minute + ":" + second)
}
function getTotalCourseTime(chapters = []) {
    let time, hour, minute, second = 0
    for (const chapter of chapters) {
        for (const episode of chapter?.episode) {
            if (episode?.time) time = episode.time.split(":") //["HH", "MM" ,"SS"]
            else time = "00:00:00".split(":")
            if (time.length == 3) {
                second += Number(time[0]) * 3600 // convert hour to sec
                second += Number(time[1]) * 60  // min -> sec
                second += Number(time[2]) // sec
            } else if (time.length == 2) {
                second += Number(time[0]) * 60  // min -> sec
                second += Number(time[1]) // sec
            }
        }
    }
    hour = Math.floor(second / 3600)
    minute = Math.floor(second / 60) % 60
    second = Math.floor(second % 60)
    // @ts-ignore
    if (String(second).length == 1) second = `0${second}`
    if (String(minute).length == 1) minute = `0${minute}`
    if (String(hour).length == 1) hour = `0${hour}`
    return (hour + ":" + minute + ":" + second)
}
module.exports = {
    getTime,
    getTotalCourseTime
}