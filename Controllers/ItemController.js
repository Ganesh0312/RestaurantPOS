const itemModel = require("../Models/ItemModel");

const getItemController = async (req, res) => {
  try {
    const item = await itemModel.find();
    res.status(200).send(item);
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};

const addItemController = async (req, res) => {
  try {
    const addItem = new itemModel(req.body);
    await addItem.save();
    res.status(201).send("Item Added Succesfully");
  } catch (error) {
    res.status(400).send("Error", error);
    console.log(`Error : ${error}`);
  }
};

const editItemController = async (req, res) => {
  try {
    await itemModel.findOneAndUpdate({ _id: req.body.itemId }, req.body);
    res.status(200).send("Item Updaed");
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteItemController = async (req, res) => {
  try {
    const { itemId } = req.body;
    await itemModel.findOneAndDelete({ _id: itemId });
    res.status(200).json("Item Deleted");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

module.exports = {
  getItemController,
  addItemController,
  editItemController,
  deleteItemController,
};
