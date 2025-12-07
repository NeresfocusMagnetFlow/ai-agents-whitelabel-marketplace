const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const pool = require('../database/db');

// All routes require admin authentication
router.use(auth);
router.use(isAdmin);

// Get dashboard stats
router.get('/stats', async (req, res) => {
    try {
        const stats = await pool.query(`
            SELECT 
                (SELECT COUNT(*) FROM users WHERE role = 'customer') as total_customers,
                (SELECT COUNT(*) FROM agents WHERE is_active = true) as total_agents,
                (SELECT COUNT(*) FROM licenses WHERE status = 'active') as active_licenses,
                (SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE status = 'completed') as total_revenue,
                (SELECT COUNT(*) FROM transactions WHERE status = 'completed') as total_transactions
        `);

        // Recent transactions
        const recentTransactions = await pool.query(`
            SELECT t.*, u.email, u.full_name, a.name as agent_name
            FROM transactions t
            JOIN users u ON t.user_id = u.id
            JOIN agents a ON t.agent_id = a.id
            ORDER BY t.created_at DESC
            LIMIT 10
        `);

        res.json({
            stats: stats.rows[0],
            recentTransactions: recentTransactions.rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// CRUD for agents
router.get('/agents', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT a.*, c.name as category_name
            FROM agents a
            LEFT JOIN categories c ON a.category_id = c.id
            ORDER BY a.created_at DESC
        `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/agents', async (req, res) => {
    const { name, slug, description, category_id, level, price, monthly_price, features } = req.body;

    try {
        const result = await pool.query(`
            INSERT INTO agents (name, slug, description, category_id, level, price, monthly_price, features)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `, [name, slug, description, category_id, level, price, monthly_price, JSON.stringify(features)]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/agents/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, category_id, level, price, monthly_price, is_active, features } = req.body;

    try {
        const result = await pool.query(`
            UPDATE agents
            SET name = COALESCE($1, name),
                description = COALESCE($2, description),
                category_id = COALESCE($3, category_id),
                level = COALESCE($4, level),
                price = COALESCE($5, price),
                monthly_price = COALESCE($6, monthly_price),
                is_active = COALESCE($7, is_active),
                features = COALESCE($8, features),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $9
            RETURNING *
        `, [name, description, category_id, level, price, monthly_price, is_active, JSON.stringify(features), id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Agent not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/agents/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM agents WHERE id = $1 RETURNING id', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Agent not found' });
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// User management
router.get('/users', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT id, email, full_name, role, created_at
            FROM users
            ORDER BY created_at DESC
        `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
