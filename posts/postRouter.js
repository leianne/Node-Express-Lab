const express = require("express");
const db = require("../data/db");

const router = express();

router.post("/", async (req, res) => {
  if (!req.body.title || !req.body.contents) {
    try {
      const post = await db.insert(req.body);
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    }
  } else {
    res.send(400).json({
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
    if(post.length > 0) {
        res.status(200).json(post);
    } else {
        res.status(404).json({message: "The post with the specified ID does not exist."})

    }
  } catch (error) {
    res
      .send(400)
      .json({ message: "The post with the specified ID does not exist." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await db.remove(req.params.id);
    if (post > 0) {
      res.status(204);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "The post could not be removed" });
  }
});

router.put('/:id', async (req, res) => {
    console.log(req.body)
    if(req.body.title !== '' || req.body.content !== '') {
        try {
            const id = req.params.id
            const updatedPost = await db.update(id, req.body);
            if(updatedPost) {
                res.status(200).json(updatedPost)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        } catch(error) {
            res.status(500).json({ error: "The post information could not be modified." })
        }
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
})
module.exports = router;
