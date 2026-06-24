import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: "Gmail", 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// transporter.verify((err, success) => {
//   console.log(err || success);
// });


export const sendEmail = async ( to, subject, html) => {
  try {
    const info = await transporter.sendMail({
    from: process.env.SMTP_USER, // sender address
    to: to, // list of recipients
    subject: subject, // subject line
    html: html, // HTML body
  });

  console.log(info);
  return info;

  } catch (error) {
    throw error;
  }
}