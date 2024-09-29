function setCookies(res,name,expired,token){
    res.cookie(name,token,{
        httpOnly: true,
        expiresIn: expired
    })
}
module.exports = {
    setCookies
}