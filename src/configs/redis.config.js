const redis = require("redis");
const redisClient = redis.createClient();

redisClient.on("connect" , ()=>{
    console.log("connected to redis");
})
redisClient.on("ready",() => {
    console.log("redis is ready to go...");
});
redisClient.on("error", (error) =>{
    console.log("redis Error: " + error);
    process.exit(0)
})
redisClient.on("end", () =>{
    console.log("disconnected from redis...");
})
redisClient.connect();
module.exports = {redisClient}