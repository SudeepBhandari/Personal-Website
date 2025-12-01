const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/', (req, res) => {
    const { name, email, subject, message } = req.body;

    const sql = `INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)`;
    const params = [name, email, subject, message];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        // TODO: Send email notification here
        res.json({
            message: 'Message sent successfully',
            data: { id: this.lastID }
        });
    });
});

module.exports = router;
