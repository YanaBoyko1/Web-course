const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); 

// CREATE
app.post('/api/ships', (req, res) => {
    const { title, description, dailyCost, type } = req.body;

    if (!title || !description || !dailyCost || !type) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const insertSql = 'INSERT INTO ships (title, description, dailyCost, type) VALUES (?, ?, ?, ?)';
    db.run(insertSql, [title, description, parseFloat(dailyCost), type], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, title, description, dailyCost, type });
    });
});

app.get('/api/ships', (req, res) => {
    const { search, sort } = req.query;
    let sql = 'SELECT * FROM ships';
    let params = [];

    if (search) {
        sql += ' WHERE LOWER(title) LIKE ?';
        params.push(`%${search.toLowerCase()}%`);
    }

    if (sort === 'asc') {
        sql += ' ORDER BY dailyCost ASC';
    } else if (sort === 'desc') {
        sql += ' ORDER BY dailyCost DESC';
    }

    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// UPDATE
app.put('/api/ships/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, dailyCost, type } = req.body;

    const sql = 'UPDATE ships SET title = ?, description = ?, dailyCost = ?, type = ? WHERE id = ?';
    db.run(sql, [title, description, parseFloat(dailyCost), type, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Ship not found.' });
        }
        res.json({ id, title, description, dailyCost, type });
    });
});

// DELETE
app.delete('/api/ships/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM ships WHERE id = ?';

    db.run(sql, id, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Ship not found.' });
        }
        res.status(204).send();
    });
});

// Підрахунок загальних витрат
app.get('/api/ships/total-expenses', (req, res) => {
    const sql = 'SELECT SUM(dailyCost) as totalExpenses FROM ships';

    db.get(sql, [], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ totalExpenses: row.totalExpenses });
    });
});

// Запускаємо сервер
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
