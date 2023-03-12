var nodemailer = require('nodemailer');

require('dotenv').config();

const sendMail = async ({ to }) => {
  const auth = {
    user: process.env.U,
    pass: process.env.PASS,
  };
  const transporter = nodemailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth,
  });
  console.log(auth);
  filename = 'invoice.pdf';
  path = `${process.cwd()}/${filename}`;
  let info = await transporter.sendMail({
    from: auth.user, // sender address
    to: to || 'rkoalsi2000@gmail.com', // list of receivers
    subject: 'Invoice', // Subject line
    text: 'PFA', // plain text body
    attachments: {
      filename,
      path,
    },
  });
  console.log('Message sent: %s', info.messageId);
  //   Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};
module.exports = { sendMail };
