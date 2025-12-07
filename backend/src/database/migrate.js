const fs = require('fs');
const path = require('path');
const pool = require('./db');

async function migrate() {
    try {
        console.log('🔄 Running database migrations...');

        const schemaSQL = fs.readFileSync(
            path.join(__dirname, 'schema.sql'),
            'utf8'
        );

        await pool.query(schemaSQL);

        console.log('✅ Migrations completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration error:', error);
        process.exit(1);
    }
}

migrate();
