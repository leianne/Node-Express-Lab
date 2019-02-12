const express = require("express");
const db = require("../data/db");

const router = express();

router.post("/", async (req, res) => {
  if (!req.body.title || !req.body.contents) {
    try {
      const post = await db.insert(req.body);
      res.status(201).json(post);
    } catch (error) {
      res
        .status(500)
        .json({
          error: "There was an error while saving the post to the database"
        });
    }
  } else {
    res
      .send(400)
      .json({
        errorMessage: "Please provide title and contents for the post."
      });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "The posts information could not be retrieved." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await db.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res
      .send(400)
      .json({ message: "The post with the specified ID does not exist." });
  }
});
module.exports = router;
