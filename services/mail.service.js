const nodemailer = require("nodemailer");
const config = require("config");

class MailService {
  constructor() {
    this.transporitor = nodemailer.createTransport({
      service: "gmail",
      host: config.get("smtp_host"),
      port: config.get("smtp_port"),
      secure: false,
      auth: {
        user: config.get("smtp_user"),
        pass: config.get("smtp_password"),
      },
    });
  }

  async sendActivationMail(toEMail, link) {
    await this.transporitor.sendMail({
      from: config.get("smtp_user"),
      to: toEMail,
      subject: "Lugatim accauntini faollantrish",
      text: "",
      html: `
        <div>
            <h3>Akkauntni Faollashtrish uchu quydaigi linkni bosing: </h3>
            <a href=${link}>Faollashtrish</a>
        </div>
        `,
    });
  }


  async sendOtpMail(toEmail, otp) {
    await this.transporitor.sendMail({
      from: config.get("smtp_user"),
      to: toEmail,
      subject: "Tasdiqlash kodi (OTP)",
      html: `
        <div>
          <h1>Sizning tasdiqlash kodingiz (OTP):</h1>
          <h2 style="color: blue;">${otp}</h2>
          <p>Bu kod 3 daqiqa davomida amal qiladi.</p>
        </div>
      `,
    });
  }

}
module.exports = new MailService();
