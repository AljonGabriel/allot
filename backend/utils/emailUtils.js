import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import generateRandomCode from './generateRandomCode.js';

const sendCodeToUserEmail = async (
  userFirstName,
  userLastName,
  userEnteredEmail,
) => {
  return new Promise((resolve, reject) => {
    let config = {
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    };

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Allot',
        link: 'www.Allot.com',
      },
    });

    let code = generateRandomCode(6);

    let response = {
      body: {
        name: userFirstName + ' ' + userLastName,
        intro: `Code: ${code}`,
        outro: 'Looking forward!',
      },
    };

    let mail = MailGenerator.generate(response);

    let message = {
      from: process.env.EMAIL,
      to: userEnteredEmail,
      subject: 'Access Code',
      html: mail,
    };

    transporter
      .sendMail(message)
      .then(() => {
        console.log('Random Code:' + code);
        resolve(code);
      })
      .catch((err) => {
        console.error(err); // Log the error for debugging
        reject(err);
      });
  });
};

export { sendCodeToUserEmail };
