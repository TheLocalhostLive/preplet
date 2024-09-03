const verifyEmailTemplate = (name, link) => (`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <h2 style="color: #007BFF; text-align: center;">Please Verify Your Email Address</h2>
        <p>Hi ${name},</p>
        <p>Welcome to Preplet! We're excited to have you on board. To ensure we have the correct email address and to help secure your account, please verify your email by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
            <a href="${link}" style="background-color: #007BFF; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                Verify My Email
            </a>
        </div>
        <p>If the button above doesn't work, you can also verify your email by clicking on the following link:</p>
        <p><a href="${link}" style="color: #007BFF;">${link}</a></p>
        <p>Thank you for joining us! If you have any questions, feel free to reply to this email. We're here to help.</p>
        <p>Best regards,<br>
        The Preplet Team</p>
        <hr style="border: none; border-top: 1px solid #dddddd; margin: 20px 0;">
        <p style="font-size: 12px; color: #777;">P.S. If you did not sign up for this account, please ignore this email.</p>
        <p style="font-size: 12px; color: #777;">Preplet<br>
        <a href="https://preplet.localhost.live" style="color: #007BFF;">
        https://preplet.localhost.live
        </a></p>
    </div>
</body>
</html>
`);

module.exports = verifyEmailTemplate;