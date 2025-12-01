const express = require('express');
const router = express.Router();
const db = require('../database');
const multer = require('multer');
const path = require('path');
const { authenticateToken } = require('../middleware/authMiddleware');

// Configure Multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

// Get all published projects
router.get('/', (req, res) => {
    db.all('SELECT * FROM projects WHERE is_published = 1 ORDER BY created_at DESC', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Admin: Get all projects
router.get('/admin', authenticateToken, (req, res) => {
    db.all('SELECT * FROM projects ORDER BY created_at DESC', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Admin: Create new project
router.post('/', authenticateToken, upload.single('image'), (req, res) => {
    const { title, description, tags, is_published } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    let tagsJson = '[]';
    if (tags) {
        tagsJson = JSON.stringify(tags.split(',').map(tag => tag.trim()).filter(tag => tag));
    }

    const sql = `INSERT INTO projects (title, slug, description, tags, image_url, is_published) VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [title, slug, description, tagsJson, image_url, is_published ? 1 : 0];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Project created successfully',
            data: { id: this.lastID, ...req.body, image_url }
        });
    });
});

// Admin: Delete project
router.delete('/:id', authenticateToken, (req, res) => {
    db.run('DELETE FROM projects WHERE id = ?', req.params.id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Project deleted', changes: this.changes });
    });
});

module.exports = router;
