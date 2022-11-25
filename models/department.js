const mongoose = require("mongoose");
const Joi = require("joi");

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  children: {
    type: [this],
    required: false,
  },
  parent: {
    type: this,
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    required: false,
  },
});

const Department = mongoose.model("Department", departmentSchema);

function validateDepartment(department) {
  const schema = {
    name: Joi.string().min(3).required(),
    description: Joi.string().optional(),
    children: Joi.array().optional(),
    parent: Joi.objectId().allow("").optional(),
  };

  return Joi.validate(department, schema);
}

exports.Department = Department;
exports.validate = validateDepartment;
exports.departmentSchema = departmentSchema;
