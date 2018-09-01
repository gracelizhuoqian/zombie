const mongoose = require("mongoose");
const userSchema = require("../schemas/user");
const articleSchema = require("../schemas/article");
const essaySchema = require("../schemas/essay");
const classifySchema = require("../schemas/classify");
const commentSchema = require("../schemas/comment");

const User = mongoose.model("User", userSchema);
const Article = mongoose.model("Article", articleSchema);
const Essay = mongoose.model("Essay", essaySchema);
const Classify = mongoose.model("Classify", classifySchema);
const Comment = mongoose.model("Comment",commentSchema);
module.exports={
  User,
  Article,
  Essay,
  Classify,
  Comment
};
