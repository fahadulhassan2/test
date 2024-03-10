import appointment from "../models/appointment.js";
import nodemailer from "nodemailer";
import Mailgen from 'mailgen';
import { contactSchema } from "../validator/uservalidator.js";
export const handleCreateAppointment = async (req, res) => {

    const userdata = req.body;

    const {
        name, email, date, phone, slot, testPrice
    } = userdata

    const userDate = new Date(date).toISOString();

    const currentDate = new Date().toISOString();

    if (userDate < currentDate) {

        return res.status(403).json({ message: 'Date is older than current date. Use new date.' });
    }

    try {
        await appointment.create({
            name, email, date, phone, slot, testPrice
        });

        let config = {
            service: 'gmail',
            auth: {
                user: "fahadulhassan2@gmail.com",
                pass: 'qhgvugvmkvvyfebz'
            }
        }

        let transporter = nodemailer.createTransport(config);

        let MailGenerator = new Mailgen({
            theme: "default",
            product: {
                background: "#f2921d",
                name: "Dr. Zeba's Clinic",
                link: 'https://google.com'
            }
        })

        let response = {
            body: {
                name: "Dr. Zeba's Clinic",
                intro: "Patient Appointement",
                table: {
                    data: [
                        {
                            name: `${name}`,
                            email: `${email}`,
                            phone: `${phone}`,
                        }
                    ]
                },
                outro: "we Will contact with you as soon as possible"
            }
        }

        let mail = MailGenerator.generate(response)

        let message = {
            from: "fahadulhassan2@gmail.com",
            to: email,
            subject: "Confirming your Upcoming Appointment",
            html: `
      
<div>                     
<div style="display: flex; color: #000080">
  
<img width="100" src="https://zeba-clinic.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.9883db1f.png&w=384&q=75" alt="not"/>
        <h1>Dr. Zeba's Clinic</h1>
</div>
<div style=" margin: 20px auto;">
  <div style="padding: 20px;">
<p>Dear ${name},</p>
<p>I hope this email finds you well. We would like to confirm your upcoming appointment with Dr. Zeba's Clinic on ${date} at ${slot}.</p>
    <p><strong>Location:</strong> Dr. Zeba's Clinic</p>
<p>If you have any questions or need to reschedule, please contact us at ${phone}.</p>
    <p>We look forward to seeing you soon.</p>
    <p>Best regards,<br>${name}<br>${phone}</p>
  </div>
  <div style="background-color: #000080; color: #fff; text-align: center; padding: 10px;">
    <p>&copy; 2024 Dr. Zeba's Clinic. All rights reserved.</p>
  </div>
 `
        }

        let message1 = {
            from: "fahadulhassan2@gmail.com",
            to: "fahadulhassan2563@gmail.com",
            subject: "Patient Appointment",
            html: `<h1 style="color:#f2921d">mail</h1>
            <img src="https://zeba-clinic.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.9883db1f.png&w=384&q=75" alt="not"/>
        `
        }
        await transporter.sendMail(message);
        await transporter.sendMail(message1);

        return res.status(201).json({
            msg: "you should receive an email",
            statusCode: 201,
            message: "Your appointment has been successfully fully booked",
        });
    } catch (error) {
        return res.json({
            statusCode: 403,
            message: error.message
        })
    }
};

export const handleContact = async (req, res) => {

    // const data = await contactSchema.validateAsync(req.body);
    // const { name, email, query } = data;

    const { name, email, query } = req.body;
    if (!name) {
        return res.status(403).json({ error: 'Name required' });
    }
    else if (!email) {
        return res.status(403).json({ error: 'Email required' });

    }
    else if (!query) {
        return res.status(403).json({ error: 'Query required' });
    }

    let config = {
        service: 'gmail',
        auth: {
            user: email,
            pass: 'qhgvugvmkvvyfebz'
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Mailgen",
            link: 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name: "Dr. Zeba's Clinic",
            intro: "Pa",
            table: {
                data: [
                    {
                        name: "Nodemailer Stack Book",
                        description: "A Backend application",
                        price: "$10.99",
                    }
                ]
            },
            outro: "we Will contact with you as soon as possible"
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from: email,
        to: email,
        subject: "Place Order",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(200).json({
            message: "your query submitted"
        })
    }).catch(error => {
        return res.status(403).json({ error: error.message })
    })
}

export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await appointment.find();
        if (appointments.length === 0) {
            return res.status(403).json({ message: "currently there is no appointments" });
        }
        return res.status(200).json(appointments);
    } catch (error) {
        return res.status(403).json({ error: error.message })
    }
}