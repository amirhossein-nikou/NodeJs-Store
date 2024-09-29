
class HomeController{
    
    async homePage(req,res,next){
        try {
            res.send("Home Page")
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new HomeController()