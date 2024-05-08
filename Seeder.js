const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./Config/Config");
const itemModel = require("./Models/ItemModel");
const items = require("./Util/Data");
require("colors");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await itemModel.deleteMany();
    const itemData = await itemModel.insertMany(items);
    console.log(`All item added`);
    process.exit();
  } catch (error) {
    console.log(`Error : ${error.message}`);
    process.exit(1); //exit with falure
  }
};

importData();
