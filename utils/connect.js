const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,

  ssl: {
    require: true,
  },
});

pool.connect().then(() => {
  console.log(`Connected to Neon database!`);
}).catch((err) => {
  console.log(`Error connecting to Neon database: ${err}`);
}); 

module.exports = pool;
