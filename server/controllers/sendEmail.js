const nodemailer = require('nodemailer')

const sendEmail = async (subject, message, send_to, send_from, repaly_to) => {
    const trasporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "karthick.santhosh1999@gmail.com",
            pass: "llqc mvuz opax tnbv"
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    const option = {
        from: send_from,
        to: send_to,
        replayTo: repaly_to,
        subject: subject,
        html: message
    }

    // send mail
    trasporter.sendMail(option, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    })
}

const mailController = async(req,res) =>{
    const {email} = req.body

    try {
        const send_to = "ks6120213@gmail.com";
        const send_from = "karthick.santhosh1999@gmail.com";
        const replay_to = "ks6120213@gmail.com";
        const subject = "Thank You Message"
        const message = `
            <h3>Hello Zino</h3>
            <p>Thank you for nod mailer</p>
            <p>Regards...</p>
        `
        await sendEmail(subject, message, send_to, send_from, replay_to)
        res.status(200).json({succes: true, message:"Email Send"})
    } catch (error) {
        res.status(500).json(error.message)
        
    }
}

module.exports = {
    mailController
}