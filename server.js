const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');


const app = express();
app.use(express.json());
app.use(bodyParser.json());


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tasks'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ', err);
        return;
    }
    console.log('Connected to database');
});

connection.query(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
   
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
    if (err) throw err;
    console.log('Tasks table created or already exists');
});


// Get all tasks
app.get('/tasks', (req, res) => {
    connection.query('SELECT * FROM tasks', (err, results) => {
        console.log(results);
        if (err) {
            console.error('Error retrieving tasks: ', err);
            res.status(500).json({ error: 'Error retrieving tasks' });
            return;
        }
        res.json(results);
    });
});

app.post('/tasks', (req, res) => {
    const { description } = req.body;

    // Insert a new task into the database
    db.query('INSERT INTO tasks ( description) VALUES (?, ?)', [description], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId });
    });
});

// // Add a new task
// app.post('/api/tasks', (req, res) => {
//     const { description } = req.body;
//     console.log(req.body);
//     if (!description) {
//         res.status(400).json({ error: 'Description is required' });
//         return;
//     }
//     connection.query('INSERT INTO tasks (description) VALUES (?)', [description], (err, result) => {
//         if (err) {
//             console.error('Error creating task: ', err);
//             res.status(500).json({ error: 'Error creating task' });
//             return;
//         }
//         res.json({ id: result.insertId, description });
//     });
// });

// Update a task
app.put('/api/tasks/:id', (req, res) => {
    const { description } = req.body;
    const id = req.params.id;
    if (!description) {
        res.status(400).json({ error: 'Description is required' });
        return;
    }
    connection.query('UPDATE tasks SET description = ? WHERE id = ?', [description, id], (err) => {
        if (err) {
            console.error('Error updating task: ', err);
            res.status(500).json({ error: 'Error updating task' });
            return;
        }
        res.json({ id, description });
    });
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
        if (err) {
            console.error('Error deleting task: ', err);
            res.status(500).json({ error: 'Error deleting task' });
            return;
        }
        res.json({ id });
    });
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});