// const auth = require("../middleware/auth");
// const admin = require("../middleware/admin");
const { Department, validate } = require("../models/department");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const departments = await Department.find();
  res.send(departments);
});

router.get("/:id", async (req, res) => {
  const department = await Department.findById(req.params.id);
  if (!department)
    return res
      .status(404)
      .send("The Department with the given ID was not found.");

  res.send(department);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.body.parent) {
    const parent = await Department.findById(req.body.parent);
    if (!parent) return res.status(400).send("Invalid Parent Department.");
  }

  if (req.body.children && req.body.children.length > 0) {
    for (let child of req.body.children) {
      const childDepartment = await Department.findById(child);
      if (!childDepartment)
        return res.status(400).send("Invalid Child Department.");
    }
  }

  const department = new Department({
    name: req.body.name,
    description: req.body.description,
    children: req.body.children,
    parent: req.body.parent,
  });
  await department.save();

  res.send(department);
});
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.body.parent) {
    const parent = await Department.findById(req.body.parent);
    if (!parent) return res.status(400).send("Invalid Parent Department.");
  }

  if (req.body.children && req.body.children.length > 0) {
    for (let child of req.body.children) {
      const childDepartment = await Department.findById(child);
      if (!childDepartment)
        return res.status(400).send("Invalid Child Department.");
    }
  }

  body = {
    name: req.body.name,
    description: req.body.description,
    parent: req.body.parent,
    children: req.body.children,
  };

  const department = await Department.findByIdAndUpdate(req.params.id, body, {
    new: true,
  });

  //   updating children parent

  if (req.body.children && req.body.children.length > 0) {
    for (let child of req.body.children) {
      const childDepartment = await Department.findById(child);
      await Department.findByIdAndUpdate(
        child,
        {
          name: childDepartment.name,
          description: childDepartment.description,
          parent: req.params.id,
        },
        {
          new: true,
        }
      );
    }
  }

  if (!department)
    return res
      .status(404)
      .send("The Department with the given ID was not found.");

  res.send(department);
});

router.delete("/:id", async (req, res) => {
  const department = await Department.findByIdAndRemove(req.params.id);

  if (!department)
    return res
      .status(404)
      .send("The Department with the given ID was not found.");

  res.send(department);
});

module.exports = router;
