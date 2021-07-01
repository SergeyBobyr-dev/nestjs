import { Injectable } from '@nestjs/common';
import * as nodemailer from "nodemailer"

@Injectable()
export class EmailService {

    constructor() { }

    async mailer(message) {

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS
            }
        })
        transporter.sendMail(message, (err, info) => {
            if (err) return console.log(err)
            console.log('Email sent: ', info)
        })
    }
  
}