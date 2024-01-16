import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const questionRouter = Router();

questionRouter.get("/", async (req, res) => {
  const collection = db.collection("questions");
  try {
    const questions = await collection.find({}).limit(100).toArray();
    return res.status(200).json({
      data: questions,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Question data not found",
    });
  }
});

questionRouter.get("/:id", async (req, res) => {
  const collection = db.collection("questions");
  const questionId = new ObjectId(req.params.id);
  try {
    const questions = await collection.findOne({ _id: questionId });
    return res.status(200).json({
      data: questions,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Question data not found",
    });
  }
});

questionRouter.post("/", async (req, res) => {
  const collection = db.collection("questions");
  const questionData = { ...req.body };
  try {
    const questions = await collection.insertOne(questionData);
    return res.status(200).json({
      message: "Question has been added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
});

questionRouter.put("/:id", async (req, res) => {
  const collection = db.collection("questions");
  const questionId = new ObjectId(req.params.id);
  const newQuestionData = { ...req.body };
  try {
    await collection.updateOne({ _id: questionId }, { $set: newQuestionData });
    return res.status(200).json({
      message: "Question has been updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
});

questionRouter.delete("/:id", async (req, res) => {
  const collection = db.collection("questions");
  const questionId = new ObjectId(req.params.id);
  try {
    await collection.deleteOne({
      _id: questionId,
    });
    return res.status(200).json({
      message: "Question has been deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
});
export default questionRouter;
