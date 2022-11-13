const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");

//Get all employees
router.get("/", async (req, res) => {
	try {
		const employees = await Employee.find();
		res.json(employees);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});

//Add employee
router.post("/", async (req, res) => {
	const employee = new Employee({
		name: req.body.name,
		designation: req.body.designation,
		department: req.body.department,
	});
	try {
		const newEmployee = await employee.save();
		res.status(201).json(newEmployee);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
});

//Find employee
router.get("/:id", getEmployeeWithId, async (req, res) => {
	res.send(res.employee);
});

//Update employee
router.patch("/:id", getEmployeeWithId, async (req, res) => {
	if (req.body.name) {
		res.employee.name = req.body.name;
	}
	if (req.body.department) {
		res.employee.department = req.body.department;
	}
	if (req.body.designation) {
		res.employee.designation = req.body.designation;
	}

	try {
		const updatedEmployee = await res.employee.save();
		res.json(updatedEmployee);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

//Delete employee
router.delete("/:id", getEmployeeWithId, async (req, res) => {
	try {
		await res.employee.remove();
		res.json({ message: "Employee details deleted" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

async function getEmployeeWithId(req, res, next) {
	let employee;
	try {
		employee = await Employee.findById(req.params.id);
		if (!employee) {
			return res.status(404).json({ message: "Cannot find employee" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}

	res.employee = employee;
	next();
}

module.exports = router;
