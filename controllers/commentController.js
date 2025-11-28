const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {
  const comment = await Comment.create({
    taskId: req.params.taskId,
    userId: req.user._id,
    text: req.body.text,
  });
  res.status(201).json(comment);
};

exports.getComments = async (req, res) => {
  const comments = await Comment.find({ taskId: req.params.taskId }).populate("userId", "name");
  res.json(comments);
};
