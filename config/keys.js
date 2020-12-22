if(process.env.NODE_ENV ==="production"){
    module.exports = require("./productionConfig");
}else{
    module.exports = require("./devConfig");
}