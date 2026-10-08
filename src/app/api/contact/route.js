import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return Response.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return Response.json(
        {
          error:
            "Email credentials are not configured. Add EMAIL_USER and EMAIL_PASS in .env.local.",
        },
        { status: 500 }
      );
    }

    const recipient = process.env.CONTACT_TO_EMAIL || process.env.EMAIL_USER;

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: recipient,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New contact message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    return Response.json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact email error:", error);
    return Response.json(
      {
        error:
          "We could not send your message right now. Please try again later or use your email client.",
      },
      { status: 500 }
    );
  }
}
