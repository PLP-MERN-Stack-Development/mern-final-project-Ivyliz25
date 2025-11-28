const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ $or: [{ createdBy: req.user._id }, { assignedTo: req.user._id }] });
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json(task);
};

exports.getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task) res.json(task);
  else res.status(404).json({ message: "Task not found" });
};

exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task) {
    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } else res.status(404).json({ message: "Task not found" });
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task) {
    await task.remove();
    res.json({ message: "Task removed" });
  } else res.status(404).json({ message: "Task not found" });
};
