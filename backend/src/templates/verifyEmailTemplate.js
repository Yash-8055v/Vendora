export const verifyEmailTemplate = (otp) => {
  return `<!DOCTYPE html>

<html>
<head>
  <meta charset="UTF-8"/>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">


<div style="background:#111827;padding:30px;text-align:center;">
  <h1 style="margin:0;color:#ffffff;">🛒 Vendora</h1>
  <p style="color:#d1d5db;margin-top:8px;">
    Multi-Vendor Marketplace
  </p>
</div>

<div style="padding:40px;">
  <h2 style="margin-top:0;color:#111827;">
    Verify Your Email
  </h2>

  <p style="font-size:16px;color:#4b5563;line-height:1.6;">
    Welcome to Vendora! Use the verification code below to verify your email address.
  </p>

  <div style="margin:30px 0;text-align:center;">
    <div style="
      display:inline-block;
      background:#111827;
      color:#ffffff;
      font-size:32px;
      font-weight:bold;
      letter-spacing:8px;
      padding:18px 32px;
      border-radius:10px;">
    ${otp}
    </div>
  </div>

  <p style="font-size:15px;color:#6b7280;">
    This code will expire in <strong>10 minutes</strong>.
  </p>

  <p style="font-size:15px;color:#6b7280;">
    If you did not request this verification, you can safely ignore this email.
  </p>

  <hr style="border:none;border-top:1px solid #e5e7eb;margin:30px 0;"/>

  <p style="font-size:13px;color:#9ca3af;">
    This is an automated message from Vendora. Please do not reply to this email.
  </p>
</div>


  </div>
</body>
</html>
`;
};


export const resetPasswordTemplate = (otp) => {
  return `<!DOCTYPE html>

<html>
<head>
  <meta charset="UTF-8"/>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
    
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
  
  <div style="background-color: #111827; color: white; padding: 20px; text-align: center;">
    <h2 style="margin: 0;">Vendora</h2>
  </div>

  <div style="padding: 30px;">
    <h2>Password Reset Request</h2>

    <p>Hello,</p>

    <p>We received a request to reset your Vendora account password.</p>

    <p>Use the following OTP to continue:</p>

    <div style="text-align: center; margin: 30px 0;">
      <span style="
        display: inline-block;
        font-size: 30px;
        letter-spacing: 8px;
        font-weight: bold;
        background: #f3f4f6;
        padding: 15px 30px;
        border-radius: 8px;
      ">
        ${otp}
      </span>
    </div>

    <p>This OTP is valid for <strong>10 minutes</strong>.</p>

    <p>If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>

    <hr style="margin: 30px 0;">

    <p style="font-size: 13px; color: #6b7280;">
      For security reasons, never share this OTP with anyone.
    </p>

    <p>— Team Vendora</p>
  </div>

</div>
</body>
</html>
  `
}