import Nodemailer from "nodemailer";

export async function sendEmail(email, subject, message) {
  return new Promise((resolve, reject) => {
    var transporter = Nodemailer.createTransport({
      pool: true,
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "idprogramming124@gmail.com",
        pass: "lwaoktsrdalkljcn",
      },
    });

    transporter.verify(function (error, _success) {
      if (error) {
        reject(error);
      } else {
        let mailOptions = {
          from: "CKB <idprogramming124@gmail.com>",
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
