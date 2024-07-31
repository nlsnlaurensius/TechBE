const express = require("express");
const employeeController = require("../controllers/employee.controller");
const router = express.Router();

router.post("/", employeeController.addEmployee);
router.get("/", employeeController.getEmployee);
router.get("/:id", employeeController.getEmployeeDetails);

module.exports = router;
