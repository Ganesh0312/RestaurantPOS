const userModel = require("../Models/UserModel");

const loginController = async (req, res) => {
  try {
    const { userid, password } = req.body;
    const user = await userModel.findOne({ userid, password, verified: true });
    if (user) {
      res.status(200).send(user);
    } else {
      res.json({
        message: "Login Failed",
        user,
      });
    }
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};

const registerController = async (req, res) => {
  try {
    const newUser = new userModel({ ...req.body, verified: true });

    await newUser.save();
    res.status(201).send("new User Added Succesfully");
  } catch (error) {
    res.status(400).send("Error", error);
    console.log(`Error : ${error}`);
  }
};

module.exports = {
  loginController,
  registerController,
};
