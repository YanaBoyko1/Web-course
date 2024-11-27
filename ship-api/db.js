const sqlite3 = require('sqlite3').verbose();

// Відкриваємо з'єднання з базою даних
const db = new sqlite3.Database('./ships.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');

        // Створюємо таблицю "ships", якщо вона не існує
        db.run(`
            CREATE TABLE IF NOT EXISTS ships (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                dailyCost REAL NOT NULL,
                type TEXT NOT NULL
            )
        `, (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            }
        });
    }
});

module.exports = db;
