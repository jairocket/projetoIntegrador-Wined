const nodemailer = require('nodemailer');

async function main(configObject) {
  let testAcount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth:{
      user: testAcount.user,
      pass: testAcount.pass
    }
  });
  let info = await transporter.sendMail({
    from: '"Wined+" <wined@wined.com>',
    ...configObject
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = main

