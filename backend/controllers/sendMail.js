const nodemailer = require('nodemailer')

exports.sendMail = async(req,res,next)=>{
    const {
        email,
        subject,
        message
    } = req.body

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        secure: true,
        port: 465,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD
        }
    })
    const info = await transporter.sendMail({
        from: `The Gaming Couple ${process.env.GMAIL_USER}`,
        to: email,
        subject: subject,
        text: message,
        html: `<p>${message}</p>`
    })
    

    res.send(200).json({message: `Email sent to: ${email}`})
}