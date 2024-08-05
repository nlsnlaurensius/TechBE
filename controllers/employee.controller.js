const pg = require("../utils/connect");

// Tambah Employee
exports.addEmployee = async function addEmployee(req, res) {
  try {
    const { name, division, salary } = req.body;
    const response = await pg.query("INSERT INTO employee (name, division, salary) VALUES ($1, $2, $3) RETURNING *", [name, division, salary]);
    res.status(201).json(response.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Dapatkan Semua Employee
exports.getEmployee = async function getEmployee(req, res) {
  try {
    const response = await pg.query("SELECT * FROM employee");
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Dapatkan Satu Employee Berdasarkan ID
exports.getOneEmployee = async function getOneEmployee(req, res) {
  try {
    const { id } = req.params;
    const response = await pg.query("SELECT * FROM employee WHERE id = $1", [id]);
    if (response.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(response.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update Employee
exports.updateEmployee = async function updateEmployee(req, res) {
  try {
    const { id } = req.params;
    const { name, division, salary } = req.body;
    const response = await pg.query(
      "UPDATE employee SET name = $1, division = $2, salary = $3 WHERE id = $4 RETURNING *",
      [name, division, salary, id]
    );
    if (response.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(response.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete Employee
exports.deleteEmployee = async function deleteEmployee(req, res) {
  try {
    const { id } = req.params;
    const response = await pg.query("DELETE FROM employee WHERE id = $1 RETURNING *", [id]);
    if (response.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

