import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, 
  },
    tls: {
    rejectUnauthorized: false,
  },
});

export async function POST(req: NextRequest) {
   console.log("ENV CHECK:", process.env.GMAIL_USER, process.env.GMAIL_APP_PASSWORD);
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ message: "All fields are required." }, { status: 400 });
  }

  try {
    await transporter.sendMail({
      from: `"GEESIX Contact Form" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      replyTo: email,
      subject: `[GEESIX] ${subject} — from ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; color: #3a3530;">
          <p style="font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#9a8f82; margin-bottom:24px;">
            New Message via GEESIX Contact Form
          </p>
          <table style="width:100%; font-size:14px; margin-bottom:24px;">
            <tr><td style="color:#9a8f82; width:80px; padding:6px 0;">Name</td><td>${name}</td></tr>
            <tr><td style="color:#9a8f82; padding:6px 0;">Email</td><td><a href="mailto:${email}" style="color:#2c2a25;">${email}</a></td></tr>
            <tr><td style="color:#9a8f82; padding:6px 0;">Subject</td><td>${subject}</td></tr>
          </table>
          <hr style="border:none; border-top:1px solid #e0dbd3; margin-bottom:24px;" />
          <p style="font-size:14px; line-height:1.7; white-space:pre-line;">${message}</p>
          <hr style="border:none; border-top:1px solid #e0dbd3; margin-top:32px;" />
          <p style="font-size:11px; color:#c8bfb3; margin-top:12px;">GEESIX</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Message sent." }, { status: 200 });
  } catch (err) {
    console.error("[Contact API] Nodemailer error:", err);
    return NextResponse.json({ message: "Failed to send. Please try again." }, { status: 500 });
  }
}