const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendWelcomeEmail(user) {
    const msg = {
        to: user.email,
        from: process.env.SENDGRID_FROM_EMAIL,
        subject: 'Welcome to AI Agents Marketplace',
        html: `<h1>Welcome ${user.full_name}!</h1><p>Start browsing amazing AI agents.</p>`
    };
    await sgMail.send(msg);
}

async function sendPurchaseEmail(user, agent, license) {
    const msg = {
        to: user.email,
        from: process.env.SENDGRID_FROM_EMAIL,
        subject: `Your license for ${agent.name}`,
        html: `<h1>Purchase Complete!</h1><p>License Key: <strong>${license.license_key}</strong></p>`
    };
    await sgMail.send(msg);
}

module.exports = { sendWelcomeEmail, sendPurchaseEmail };
