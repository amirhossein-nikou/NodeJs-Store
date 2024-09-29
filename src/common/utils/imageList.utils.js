const path = require('path');
function genImageList(files,imagePath){
    if(files.length > 0){
        return (files.map(file => path.join(imagePath,file.filename)).map(item => item.replace(/\\/gi, '/')))
    }else{
        return []
    }
}
module.exports = {
    genImageList
}