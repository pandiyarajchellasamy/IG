import nodemailer from 'nodemailer';

// Feedback submission handler
export const submitFeedback = async (req, res) => {
  // Destructure input fields from the request body
  const { name, email, subject, message } = req.body;

  // Validate input fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Configure the transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // The sender's email (configured in .env)
      pass: process.env.EMAIL_PASS  // The sender's email password (configured in .env)
    }
  });

  // Define the mail options
  const mailOptions = {
    from: email,                                 // Sender's email (user's email from form input)
    to: process.env.EMAIL_USER,                  // Recipient email (configured in .env)
    subject: `Feedback - ${subject}`,            // Subject line
    text: `You have received a new message from ${name} (${email}):\n\n${message}`
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send feedback'});
}
};
