const express = require('express');
const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
cont inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;
const app = express();

const prompt = {
    viewAllEmployees: "View all Employees",
    viewByDepartment: "View all Employees by Depatment",
    viewByManager: "View all Employees by Manager",
    addEmployee: "Add an Employee",
    removeEmployee: "Remove an Employee",
    updateEmployeeRole: "Update an Employee Role",
    updateManager: "Update an Employee Manager",
    viewAllPositions: "View all Positions",
    exit: "Exit"
};

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'HTMLCSSJQuery1986!',
    database: 'work_db'
  },
  console.log(`Connected to the work_db database.`)
);

function prompt() {
    inquirer
    .prompt();{
        name: 'action',
        type: 'list',
        messasge: "What would you like to accomplish?",
        choices: [
            promptMessages. viewAllEmployees,
            promptMessages.viewByDepartment,
            promptMessages.viewByManager,
            promptMessages.viewAllPositions,
            promptMessages.addEmployee,
            promptMessages.removeEmployee,
            promptMessages.updateEmployeeRole,
            promptMessages.exit
        ]
    };

// Create an employee
app.post('/api/movies', ({ body }, res) => {
  const sql = `INSERT INTO movies (movie_name)
    VALUES (?)`;
  const params = [body.movie_name];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

// get all employees
app.get('/api/movies', (req, res) => {
  const sql = `SELECT id, movie_name AS title FROM movies`;
  
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Delete an employee
app.delete('/api/movies/:id', (req, res) => {
  const sql = `DELETE FROM movies WHERE id = ?`;
  const params = [req.params.id];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
      message: 'Movie not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

// Read list of all reviews and associated movie name using LEFT JOIN
app.get('/api/reviews', (req, res) => {
  const sql = `
    SELECT
      reviews.id,
      movies.movie_name AS movie,
      reviews.review
    FROM reviews
    LEFT JOIN movies ON reviews.movie_id = movies.id
    ORDER BY movies.movie_name;`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Bonus: Update role
app.put('/api/reviews/:id', (req, res) => {
  const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
  const params = [req.body.review, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Movie not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
