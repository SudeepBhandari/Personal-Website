const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database/portfolio.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    const stmt = db.prepare("INSERT INTO projects (title, slug, description, tags, image_url, is_published) VALUES (?, ?, ?, ?, ?, ?)");
    stmt.run("Test Project", "test-project", "This is a test project description.", '["Design", "Web"]', "https://via.placeholder.com/400x300", 1);
    stmt.finalize();
    console.log("Test project inserted.");
});

db.close();
