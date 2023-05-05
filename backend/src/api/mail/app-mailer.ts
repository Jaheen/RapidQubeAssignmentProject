import { createTransport, Transporter } from "nodemailer";


/**
 * Class to send different types of mails through nodemailer.
 */
export default class AppMailer {
    /**
     * Send a simple text based email to a receiver
     * @param toAddress receiver's email address
     * @param subject subject of the mail
     * @param body text content of the mail
     */
    static sendSimpleTextMail(toAddress: string, subject: string, body: string) {

        const transporter: Transporter = createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_ID,
                pass: process.env.GMAIL_ACCESS_PASSWORD
            }
        })
        
        transporter.sendMail({
            from: process.env.NODEMAILER_EMAIL_ID,
            to: toAddress,
            subject,
            text: body
        }).catch(console.log)
    }
}
