const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendVerificationEmail = async (userEmail, token) => {
    const verificationLink = `${process.env.SERWER}/users/verify-email?token=${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Verify your email address',
        html: `<h1>Email Verification</h1>
               <p>Please verify your email by clicking the link below:</p>
               <a href="${verificationLink}">Verify Email</a>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent to:', userEmail);
    } catch (error) {
        console.error('Error sending verification email:', error.message);
        throw new Error('Could not send verification email.');
    }
};

module.exports = {
    sendVerificationEmail,
};