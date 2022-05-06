import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from './prisma'

const app = express()

app.use(express.json())

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6ebaf8578df82e",
    pass: "e7fe2e8cdbc69f"
  }
})

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const newFeedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot
    }
  })

  await transport.sendMail({
    from: 'Equipe Feedget <equipe@feedget.com>',
    to: 'Rodolfo <rodolfo.ti.01@gmail.com>',
    subject: 'Novo feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #222">`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Commentário: ${comment}</p>`,
      `</div>`
    ].join('\n')
  })

  return res.status(201).json({ data: newFeedback })
})

app.listen(3333, () => {
  console.log('✔️  Server running on port 3333!')
})