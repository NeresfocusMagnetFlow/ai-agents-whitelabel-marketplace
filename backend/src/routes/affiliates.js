const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const pool = require('../database/db');
const crypto = require('crypto');

router.post('/apply', auth, async (req, res) => {
    const existing = await pool.query('SELECT id FROM affiliates WHERE user_id = $1', [req.user.id]);
    if (existing.rows.length > 0) return res.status(400).json({ error: 'Already an affiliate' });

    const code = crypto.randomBytes(4).toString('hex').toUpperCase();
    const result = await pool.query(
        'INSERT INTO affiliates (user_id, affiliate_code, commission_rate) VALUES ($1, $2, 20.00) RETURNING *',
        [req.user.id, code]
    );

    await pool.query('UPDATE users SET role = $1 WHERE id = $2', ['affiliate', req.user.id]);
    res.status(201).json({ success: true, affiliate: result.rows[0] });
});

router.get('/dashboard', auth, async (req, res) => {
    const affiliate = await pool.query('SELECT * FROM affiliates WHERE user_id = $1', [req.user.id]);
    if (affiliate.rows.length === 0) return res.status(404).json({ error: 'Not an affiliate' });

    const stats = await pool.query(`
        SELECT COUNT(*) as total_sales, COALESCE(SUM(commission_amount), 0) as total_commissions
        FROM affiliate_sales WHERE affiliate_id = $1
    `, [affiliate.rows[0].id]);

    res.json({ affiliate: affiliate.rows[0], stats: stats.rows[0] });
});

module.exports = router;
