const express = require('express');
const router = express.Router();
const pool = require('../database/db');
const { validateLicense } = require('../utils/license');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({ windowMs: 60000, max: 30 });
router.use(limiter);

router.post('/validate', async (req, res) => {
    const { license_key, agent_slug } = req.body;
    if (!license_key) return res.status(400).json({ valid: false, error: 'license_key required' });

    let agentId = null;
    if (agent_slug) {
        const agent = await pool.query('SELECT id FROM agents WHERE slug = $1', [agent_slug]);
        if (agent.rows.length > 0) agentId = agent.rows[0].id;
    }

    const validation = await validateLicense(pool, license_key, agentId);
    res.json(validation.valid ? {
        valid: true,
        agent: { id: validation.license.agentId, name: validation.license.agentName },
        license: { type: validation.license.type, status: validation.license.status }
    } : { valid: false, error: validation.error });
});

router.get('/health', (req, res) => {
    res.json({ status: 'operational', version: '1.0.0' });
});

module.exports = router;
