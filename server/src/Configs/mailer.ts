import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "557d3b7b64b14e",
    pass: "f2dc99d1e54b2e",
  },
});

export const sendEmail = async (to: string, link: string) => {
    const mailOptions = {
        from: "techtechnicalshrey@gmail.com",
        to,
        subject: "Verify Email",
        html: `<p>Click <a href="${link}">here</a> to verify your email</p>`,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log("error", error);
        } else {
            console.log("info", info);
        }
    })
}