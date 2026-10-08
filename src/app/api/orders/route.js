import { randomUUID } from "node:crypto";
import nodemailer from "nodemailer";

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });

const cleanText = (value, maximumLength) =>
  typeof value === "string" ? value.trim().slice(0, maximumLength) : "";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "The order details were not valid JSON." }, { status: 400 });
  }

  const customer = {
    name: cleanText(body?.customer?.name, 100),
    email: cleanText(body?.customer?.email, 254),
    phone: cleanText(body?.customer?.phone, 40),
    address: cleanText(body?.customer?.address, 300),
    city: cleanText(body?.customer?.city, 100),
  };

  if (
    !customer.name ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email) ||
    !customer.phone ||
    !customer.address ||
    !customer.city
  ) {
    return Response.json(
      { error: "Enter a valid name, email, phone, delivery address and city." },
      { status: 400 }
    );
  }

  if (
    !Array.isArray(body?.items) ||
    body.items.length === 0 ||
    body.items.length > 30
  ) {
    return Response.json({ error: "Your cart is empty or contains too many items." }, { status: 400 });
  }

  const items = [];
  for (const item of body.items) {
    const title = cleanText(item?.title, 200);
    const price = Number(item?.price);
    const quantity = Number(item?.quantity);
    if (
      !title ||
      !Number.isFinite(price) ||
      price < 0 ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 99
    ) {
      return Response.json({ error: "One or more cart items are invalid." }, { status: 400 });
    }
    items.push({ title, price, quantity });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return Response.json(
      { error: "Order email is not configured. Set EMAIL_USER and EMAIL_PASS in .env.local." },
      { status: 503 }
    );
  }

  const orderReference = randomUUID().slice(0, 8).toUpperCase();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const recipient = process.env.CONTACT_TO_EMAIL || process.env.EMAIL_USER;
  const safeCustomer = Object.fromEntries(
    Object.entries(customer).map(([key, value]) => [key, escapeHtml(value)])
  );
  const safeItems = items
    .map(
      (item) =>
        `<li>${escapeHtml(item.title)} × ${item.quantity} — $${(item.price * item.quantity).toFixed(2)}</li>`
    )
    .join("");

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Pk store orders" <${process.env.EMAIL_USER}>`,
      to: recipient,
      replyTo: customer.email,
      subject: `Order request ${orderReference}`,
      text: [
        `Order reference: ${orderReference}`,
        `Name: ${customer.name}`,
        `Email: ${customer.email}`,
        `Phone: ${customer.phone}`,
        `Address: ${customer.address}, ${customer.city}`,
        "",
        "Items:",
        ...items.map((item) => `${item.title} x ${item.quantity} — $${(item.price * item.quantity).toFixed(2)}`),
        "",
        `Subtotal: $${total.toFixed(2)}`,
        "No payment was taken. Confirm availability and payment with the customer.",
      ].join("\n"),
      html: `
        <h2>Order request ${orderReference}</h2>
        <p><strong>Name:</strong> ${safeCustomer.name}</p>
        <p><strong>Email:</strong> ${safeCustomer.email}</p>
        <p><strong>Phone:</strong> ${safeCustomer.phone}</p>
        <p><strong>Address:</strong> ${safeCustomer.address}, ${safeCustomer.city}</p>
        <h3>Items</h3>
        <ul>${safeItems}</ul>
        <p><strong>Subtotal:</strong> $${total.toFixed(2)}</p>
        <p>No payment was taken. Confirm availability and payment with the customer.</p>
      `,
    });
  } catch (error) {
    console.error("Order notification email error:", error);
    return Response.json(
      { error: "We could not send your order request. Please try again later." },
      { status: 500 }
    );
  }

  return Response.json({ success: true, orderReference });
}
