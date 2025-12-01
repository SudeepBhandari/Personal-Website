const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database/portfolio.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    const stmt = db.prepare("INSERT INTO projects (title, slug, description, tags, image_url, external_link, is_published) VALUES (?, ?, ?, ?, ?, ?, ?)");
    stmt.run("External Link Project", "link-project", "Testing external link.", '["Test"]', "https://via.placeholder.com/400x300", "https://example.com", 1);
    stmt.finalize();
    console.log("Project with external link inserted.");
});

db.close();
