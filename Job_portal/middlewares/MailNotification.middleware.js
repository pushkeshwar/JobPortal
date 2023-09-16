import nodemailer from 'nodemailer';
// Create a transporter object using SMTP

export default function MailNotification(usermail, username){
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
        user: 'pushkeshwar.singh60@gmail.com',
        pass: 'tortezpzerinuort',
        },
        });
    
        // Define the email configuration
        const mailOptions = {
        from: 'your-email@gmail.com',
        to: usermail,
        subject: 'Easily !! Thank you for applying',
        text: `Hi ${username}, \nThis is a confirmation mail that you have successfully applied to the Job. please check the dashboard for more info.`,
        };
    
        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            if (error) {
            console.error('Error occurred:', error);
            } else {
            console.log('Email sent:', info.response);
            }
        }
        });
}