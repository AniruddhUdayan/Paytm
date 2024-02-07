const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { z } = require("zod");
const { User } = require("../db");
const { Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

mongoose.connect("mongodb+srv://Ani:Abhiani@atlascluster.phipben.mongodb.net/");

const schemaSignUp = z.object({
  username: z.string().email(),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  password: z.string().min(6),
});

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { success } = schemaSignUp.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "Incorrect inputs",
      });
    }
    const exisitngUser = await User.findOne({ username: req.body.username });
    if (exisitngUser) {
      return res.status(411).send("User already exists");
    }
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    const userId = user._id;

    await Account.create({
      userId,
      balance: 1 + Math.random() * 10000,
    }); // Giving an initial amount to user on signup

    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );

    res.json({
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    console.error("Validation error:", error.message);

    // Send error response
    res.status(400).send("Error while signing in");
  }
});

const schemaSignIn = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

router.post("/signin", async (req, res) => {
  try {
    const { success } = schemaSignIn.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "Incorrect inputs",
      });
    }
    const exisitngUser = await User.findOne({ username:req.body.username, password: req.body.password });
    if (!exisitngUser) {
      return res.status(411).send("User does not exist exists");
    }
    const userId = exisitngUser._id;
    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
  } catch (error) {
    console.error("Validation error:", error.message);

    // Send error response
    res.status(400).send("Error while logging in");
  }
});

const schemaUserUpdate = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  password: z.string().min(6),
});

router.put("/", authMiddleware, async (req, res) => {
  const { password, firstName, lastName } = schemaUserUpdate.safeParse(
    req.body
  );
  if (!firstName) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }
  await User.updateOne(req.body, {
    _id: req.userId,
  });
  res.json({
    message: "Updated successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter, //$regex is used for finding substring in string
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
