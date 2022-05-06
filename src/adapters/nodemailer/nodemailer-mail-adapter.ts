import nodemailer from 'nodemailer'

import { MailAdapter, SendMailData } from "../mail-adapter"

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6ebaf8578df82e",
    pass: "e7fe2e8cdbc69f"
  }
})

export class NodemailerMailAdapter implements MailAdapter {

  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <equipe@feedget.com>',
      to: 'Rodolfo <rodolfo.ti.01@gmail.com>',
      subject,
      html: body
    })
  }
}