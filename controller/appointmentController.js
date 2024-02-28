import appointment from "../models/appointment.js";
import nodemailer from "nodemailer";
import Mailgen from 'mailgen';
import { contactSchema } from "../validator/uservalidator.js";
export const handleCreateAppointment = async (req, res) => {

    const userdata = req.body;

    const {
        name, email, date, phone, slot,
    } = userdata

    const userDate = new Date(date).toISOString();

    const currentDate = new Date().toISOString();

    if (userDate < currentDate) {

        return res.status(403).json({ message: 'Date is older than current date. Use new date.' });
    }
    else {
        try {
            await appointment.create({
                name, email, date, phone, slot,
            });

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
                from: email,
                to: "fahadulhassan2@gmail.com",
                subject: "Patient Appointment",
                html: `<h1 style="color:#f2921d">mail</h1>
                <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fvectors%2Flogo&psig=AOvVaw22GivWpozQsSf2pZG48nzu&ust=1709176038736000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNiW_YiHzYQDFQAAAAAdAAAAABAE" alt="not"/>
            `
            }

            await transporter.sendMail(message);

            return res.status(201).json({
                msg: "you should receive an email",
                statusCode: 201,
                message: "successfully Created",
            });
        } catch (error) {
            return res.json({
                statusCode: 403,
                message: error.message
            })
        }

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