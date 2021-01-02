//Files
const { ItemDetail } = require("../models/itemSchema");
//SEARCH

const filterSearch = (itemList, Search) => {
  for (let wordIndex = 1; wordIndex < Search.length; wordIndex++) {
    console.log("itemList:", itemList);
    console.log(`Search[${wordIndex}]:`, Search[wordIndex]);
    if (wordIndex === 0) continue;
    itemList = itemList.filter((itemObject) => {
      let flag = false;
      let findResult = new RegExp( Search[wordIndex] , "ig");
      //testing on itemName
      flag = findResult.test(itemObject.itemName);
      if (flag) return itemObject;
      //testing on description
      flag = findResult.test(itemObject.description);
      if (flag) return itemObject;
      //testing on category
      flag = findResult.test(itemObject.category);
      if (flag) return itemObject;
    });
  }
  return itemList;
};
exports.search = async (req, res) => {
  const Search = req.body.Search.split(" ");
  //parent searching based on first word
  const firstWord = Search[0];
  const regex = new RegExp("\\b" + firstWord + "\\b", "gi");
  const itemName = await ItemDetail.find({
    itemName: regex,
  });
  const description = await ItemDetail.find({
    description: regex,
  });
  const category = await ItemDetail.find({
    category: regex,
  });
  const combinedResult = [...itemName, ...description, ...category];
  //unique array of objects
  const jsonObject = combinedResult.map(JSON.stringify);
  uniqueSet = new Set(jsonObject);
  items = Array.from(uniqueSet).map(JSON.parse);
  //filtering based on further words in search string
  let itemList = items;
  if (Search.length > 1 && itemList.length) itemList = filterSearch(itemList, Search);
  if (itemList.length)
    return res.send({ itemList: [...itemList], response: true });
  return res.send({ response: false });
};
