import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

type ContactPayload = {
  name: string
  phone: string
  email: string
  company: string
  service: string
  details: string
  slotDate: string
  slotTime: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>

    const required = ["name", "phone", "email", "company", "service", "details", "slotDate", "slotTime"] as const
    for (const key of required) {
      if (!body[key] || typeof body[key] !== "string") {
        return NextResponse.json({ error: "Missing field" }, { status: 400 })
      }
    }

    const host = process.env.SMTP_HOST
    const port = Number(process.env.SMTP_PORT || 587)
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    const to = process.env.CONTACT_TO || "info@entshaar.com"

    if (!host || !user || !pass) {
      return NextResponse.json({ error: "Email not configured" }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    })

    const subject = `طلب تواصل من الموقع - ${body.service}`

    const text = `تفاصيل الطلب:
الاسم: ${body.name}
الجوال: ${body.phone}
البريد: ${body.email}
الشركة: ${body.company}
الخدمة المطلوبة: ${body.service}
الوصف: ${body.details}
الموعد المفضل: ${body.slotDate} ${body.slotTime}`

    const html = `
      <div style="font-family:Arial, sans-serif; line-height:1.6; color:#0b182f;">
        <h2>طلب تواصل من الموقع</h2>
        <p><strong>الاسم:</strong> ${body.name}</p>
        <p><strong>الجوال:</strong> ${body.phone}</p>
        <p><strong>البريد:</strong> ${body.email}</p>
        <p><strong>الشركة:</strong> ${body.company}</p>
        <p><strong>الخدمة المطلوبة:</strong> ${body.service}</p>
        <p><strong>الوصف:</strong><br/>${body.details}</p>
        <p><strong>الموعد المفضل:</strong> ${body.slotDate} ${body.slotTime}</p>
      </div>
    `

    await transporter.sendMail({
      from: `Website Contact <${user}>`,
      to,
      replyTo: body.email,
      subject,
      text,
      html,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("contact api error", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}