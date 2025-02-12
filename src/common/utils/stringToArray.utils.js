const StringToArray = function(field){
    return function(req,res,next){
        if(req.body[field]){
            if(typeof req.body[field] == "string"){
                if(req.body[field].indexOf(",") >=0){
                    req.body[field] = (req.body[field].split(","))?.map(item => item.trim().replace(/[\]\[\"\']+/gi,""))
                }else{
                    req.body[field] = [req.body[field]]
                }
            }
            if(Array.isArray(req.body[field])){
                req.body[field] = req.body[field]?.map(item => item.trim())
                req.body[field] = [... new Set(req.body[field])]
            }
        }else{
            req.body[field] = []
        }
        next()
    }
}
module.exports ={StringToArray}