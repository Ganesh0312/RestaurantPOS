const billsModel = require("../Models/BillsModel");

const billsController = async (req, res) => {
  try {
    const addbills = new billsModel(req.body);
    await addbills.save();
    res.send("bills Added Succesfully");
  } catch (error) {
    res.send("Error", error);
    console.log(`Error : ${error}`);
  }
};

const getbillsController = async (req, res) => {
  try {
    const bills = await billsModel.find();
    res.send(bills);
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};

module.exports = {
  billsController,
  getbillsController,
};
