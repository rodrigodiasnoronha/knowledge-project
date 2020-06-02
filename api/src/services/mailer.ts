import nodemailer from 'nodemailer';

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } = process.env;

// create reusable transporter object using the default SMTP transport
const mailer = nodemailer.createTransport({
    host: MAIL_HOST || 'stmp.gmail.com',
    port: MAIL_PORT || 257,
    secure: false, // true for 465, false for other ports
    auth: {
        user: MAIL_USER, // generated ethereal user
        pass: MAIL_PASS, // generated ethereal password
    },
});

export default mailer;
