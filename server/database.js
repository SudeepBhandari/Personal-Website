const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '../database/portfolio.db');

// Ensure database directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initDb();
    }
});

function initDb() {
    db.serialize(() => {
        // Users Table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password_hash TEXT
        )`);

        // Projects Table
        db.run(`CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            slug TEXT UNIQUE,
            description TEXT,
            tags TEXT,
            image_url TEXT,
            gallery_urls TEXT,
            external_link TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            is_published INTEGER DEFAULT 0
        )`);

        // Messages Table
        db.run(`CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            subject TEXT,
            message TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Seed Admin User
        const bcrypt = require('bcrypt');
        const adminUsername = 'admin';
        const adminPassword = 'password123'; // Change this!

        db.get('SELECT * FROM users WHERE username = ?', [adminUsername], async (err, row) => {
            if (!row) {
                const hashedPassword = await bcrypt.hash(adminPassword, 10);
                db.run('INSERT INTO users (username, password_hash) VALUES (?, ?)', [adminUsername, hashedPassword], (err) => {
                    if (err) console.error(err.message);
                    else console.log('Admin user created.');
                });
            }
        });

        console.log('Database tables initialized.');
    });
}

module.exports = db;
