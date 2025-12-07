const express = require('express');
const router = express.Router();
const pool = require('../database/db');

// Get all agents (public)
router.get('/', async (req, res) => {
    try {
        const { category, level, search } = req.query;

        let query = `
            SELECT a.*, c.name as category_name, c.slug as category_slug
            FROM agents a
            LEFT JOIN categories c ON a.category_id = c.id
            WHERE a.is_active = true
        `;
        const params = [];

        if (category) {
            params.push(category);
            query += ` AND c.slug = $${params.length}`;
        }

        if (level) {
            params.push(level);
            query += ` AND a.level = $${params.length}`;
        }

        if (search) {
            params.push(`%${search}%`);
            query += ` AND (a.name ILIKE $${params.length} OR a.description ILIKE $${params.length})`;
        }

        query += ' ORDER BY a.created_at DESC';

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get single agent
router.get('/:slug', async (req, res) => {
    try {
        const { slug } = req.params;

        const result = await pool.query(`
            SELECT a.*, c.name as category_name, c.slug as category_slug
            FROM agents a
            LEFT JOIN categories c ON a.category_id = c.id
            WHERE a.slug = $1 AND a.is_active = true
        `, [slug]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Agent not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get categories
router.get('/meta/categories', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM categories ORDER BY name');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
