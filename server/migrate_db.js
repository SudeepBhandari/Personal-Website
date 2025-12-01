const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../database/portfolio.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    // Check if column exists first to avoid error
    db.all("PRAGMA table_info(projects)", (err, rows) => {
        if (err) {
            console.error("Error getting table info:", err);
            return;
        }

        const columnExists = rows.some(row => row.name === 'external_link');

        if (!columnExists) {
            db.run("ALTER TABLE projects ADD COLUMN external_link TEXT", (err) => {
                if (err) {
                    console.error("Error adding column:", err.message);
                } else {
                    console.log("Column 'external_link' added successfully.");
                }
                db.close();
            });
        } else {
            console.log("Column 'external_link' already exists.");
            db.close();
        }
    });
});
