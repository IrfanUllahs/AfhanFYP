import FoodModel from "../model/Food.model.js";
import providerModel from "../model/Provider.model.js";
export const createFood = async (req, res) => {
  const { name, price, avlabilityTime, email, phone } = req.body;
  try {
    const provider = await providerModel.findOne({ email });
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }
    const food = new FoodModel({
      name,
      price,
      avlabilityTime,
      phone,
      userRef: provider._id,
    });
    await food.save();
    res.status(200).json({ message: "Food created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const getFood = async (req, res) => {
  try {
    const food = await FoodModel.find();
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ message: " Something went wrong" });
  }
};
export default { createFood, getFood };
