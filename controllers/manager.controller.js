const bcrypt = require('bcrypt');
const pg = require("../utils/connect");

exports.register = async function addEmployee(req, res) {
  try {
    const { name, password } = req.body;

    // log data diterima dari user
    console.log('Received registration request for:', name);

    // cek jika user sudah ada di database
    const userExists = await pg.query("SELECT * FROM manager WHERE name = $1", [name]);
    if (userExists.rowCount > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user baru ke database
    const response = await pg.query(
      "INSERT INTO manager (name, password) VALUES ($1, $2) RETURNING *",
      [name, hashedPassword]
    );

    console.log('User registered successfully:', name);
    res.status(201).json({ message: "Registration successful", user: { name: response.rows[0].name } });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: "Server error", error: error.message, stack: error.stack });
  }
};

exports.login = async function login(req, res) {
  try {
    const { name, password } = req.body;
    
    // cari user di database
    const result = await pg.query("SELECT * FROM manager WHERE name = $1", [name]);
    
    if (result.rowCount === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result.rows[0];
    
    // cek password yang diterima dengan password di database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // login berhasil
    return res.status(200).json({ message: "Login successful", user: { name: user.name } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};