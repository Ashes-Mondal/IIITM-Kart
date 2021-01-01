//Files
const { ItemDetail } = require("../models/itemSchema");
//SEARCH
exports.search = async (req, res) => {
  const Search = req.body.Search.toLowerCase();
   //new RegExp("\\b" + Search + "\\b", "gi")
  const itemName = await ItemDetail.find({
    itemName: new RegExp("\\b" + Search + "\\b", "gi"),
  }).exec();
  const description = await ItemDetail.find({
    discription: new RegExp("\\b" + Search + "\\b", "gi"),
  }).exec();
  const category = await ItemDetail.find({
    category: new RegExp("\\b" + Search + "\\b", "gi"),
  }).exec();
  const combinedResult = [...itemName, ...description, ...category];
  //unique array of objects
  const jsonObject = combinedResult.map(JSON.stringify);
  uniqueSet = new Set(jsonObject);
  itemList = Array.from(uniqueSet).map(JSON.parse);
  if (itemList.length)
    return res.send({ itemList: [...itemList], response: true });
  return res.send({ response: false });
};
