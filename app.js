import express from "express";
import { client } from "./utils/db.js";
import questionRouter from "./apps/questions.js";
import bodyParser from "body-parser";
import cors from "cors";

async function init() {
  const app = express();
  const port = 4002;

  try {
    await client.connect();
  } catch {
    console.log("Cannot connect mongodb");
  }
  app.use(cors());
  app.use(bodyParser.json());

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use("/question", questionRouter);

  app.get("/", (req, res) => {
    return res.json("Hello Skill Checkpoint #2");
  });

  app.get("*", (req, res) => {
    return res.status(404).json("Not found");
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

init();
