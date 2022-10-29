const nodemailer = require('nodemailer')

async function main(configObject) {
  // let testAcount = await nodemailer.createTestAccount();

  // let transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   secure: false,
  //   auth:{
  //     user: testAcount.user,
  //     pass: testAcount.pass
  //   }
  // });

  const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'eac9af5ccc8d5f',
      pass: '24d82453a8f2ba',
    },
  })
  let info = await transport.sendMail({
    from: '"Wined+" <wined@wined.com>',
    ...configObject,
  })

  console.log('Message sent: %s', info.messageId)
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}

module.exports = main
