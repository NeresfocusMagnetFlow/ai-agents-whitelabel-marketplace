const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const pool = require('../database/db');
const { Parser } = require('json2csv');

router.use(auth);
router.use(isAdmin);

router.get('/sales', async (req, res) => {
    const { format } = req.query;
    const result = await pool.query(`
        SELECT t.*, u.email, a.name as agent_name
        FROM transactions t
        JOIN users u ON t.user_id = u.id
        JOIN agents a ON t.agent_id = a.id
        WHERE t.status = 'completed'
        ORDER BY t.created_at DESC
    `);

    if (format === 'csv') {
        const fields = ['id', 'email', 'agent_name', 'amount', 'created_at'];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(result.rows);
        res.header('Content-Type', 'text/csv');
        res.attachment(`sales-${Date.now()}.csv`);
        return res.send(csv);
    }

    res.json({ total: result.rows.length, data: result.rows });
});

module.exports = router;
