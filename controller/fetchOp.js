const robotsJson = require("../robots.json");

exports.fetchJson = (req,res)=>{
    const robots =robotsJson.robots;
    console.log("robots:",robots);
    res.json(robots);
}