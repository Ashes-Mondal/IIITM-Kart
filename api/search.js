//Files
const { ItemDetail } = require("../models/itemSchema");
//SEARCH
exports.search = async (req, res) => {
  const Search = req.body.Search;
  const regex = new RegExp("\\b" + Search + "\\b", "i");
  const itemName = await ItemDetail.find({
    itemName:regex
  });
  const description = await ItemDetail.find({
    description:regex
  });
  const category = await ItemDetail.find({
    category:regex
  });
  const combinedResult = [...itemName, ...description, ...category];
  //unique array of objects
  const jsonObject = combinedResult.map(JSON.stringify);
  uniqueSet = new Set(jsonObject);
  itemList = Array.from(uniqueSet).map(JSON.parse);
  if (itemList.length)
    return res.send({ itemList: [...itemList], response: true });
  return res.send({ response: false });
};
