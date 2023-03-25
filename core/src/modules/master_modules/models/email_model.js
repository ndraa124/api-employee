import Nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export async function sendEmail(email, subject, message) {
  return new Promise((resolve, reject) => {
    var transporter = Nodemailer.createTransport({
      pool: true,
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_EMAIL_PASS,
      },
    });

    transporter.verify(function (error, _success) {
      if (error) {
        reject(error);
      } else {
        let mailOptions = {
          from: `CKB <${process.env.USER_EMAIL}>`,
          to: `Employee ${email}`,
          subject: subject,
          text: `${message}`,
          html: `<p>${message}</p>`,
        };

        transporter.sendMail(mailOptions, function (err, _info) {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        });
      }
    });
  });
}
